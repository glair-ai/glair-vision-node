import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { KtpSessions } from "./ktpSessions";
import { Config } from "../config";

describe("KtpSessions", () => {
  const config = new Config({
    baseUrl: "http://localhost:3000",
    apiKey: "api_key",
    apiVersion: "v1",
    username: "glair",
    password: "glair",
  });

  const mockRetrieveSessionResponse = {
    status: "PENDING",
    expired: 1,
    url: "http://localhost:3001",
    success_url: "http://www.google.com",
    cancel_url: "http://www.google.com",
    result: {},
  };

  const mockCreateSessionResponse = {
    status: "PENDING",
    success_url: "https://www.google.com/success",
    cancel_url: "https://www.google.com/fail",
    url: "http://localhost:3000/npwp/DVbI3QpzWVOPw2VCtsEHbFtyRBG1rWQz",
  };

  const server = setupServer(
    rest.get(
      "http://localhost:3000/ocr/v1/ktp-sessions/1234",
      (_, res, ctx) => {
        return res(ctx.json(mockRetrieveSessionResponse));
      }
    ),
    rest.post(
      "http://localhost:3000/ocr/v1/ktp-sessions",
      async (req, res, ctx) => {
        const body = await req.text();
        if (
          body !==
          JSON.stringify({
            success_url: "https://www.google.com/success",
            cancel_url: "https://www.google.com/fail",
          })
        ) {
          return res(ctx.status(500));
        }

        return res(ctx.json(mockCreateSessionResponse));
      }
    )
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test("should be able to be constructed", () => {
    expect(() => new KtpSessions(config)).not.toThrow();
  });

  test("should have `create` and `retrieve` method", () => {
    const session = new KtpSessions(config);

    expect(typeof session.create).toBe("function");
    expect(typeof session.retrieve).toBe("function");
  });

  test("should create an npwp session", async () => {
    const session = new KtpSessions(config);
    const result = await session.create({
      success_url: "https://www.google.com/success",
      cancel_url: "https://www.google.com/fail",
    });

    expect(result).toStrictEqual(mockCreateSessionResponse);
  });

  test("should throw validation error", async () => {
    const session = new KtpSessions(config);
    const param = {
      success_url: "not_an_url",
      cancel_url: "https://www.google.com/fail",
    };

    await expect(session.create(param)).rejects.toThrow(
      "Success URL must be a valid URL"
    );
  });

  test("should retrieve an npwp session", async () => {
    const session = new KtpSessions(config);
    const result = await session.retrieve({
      sid: "1234",
    });

    expect(result).toStrictEqual(mockRetrieveSessionResponse);
  });
});
