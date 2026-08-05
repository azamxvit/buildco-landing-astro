import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Plain Vercel Function (no framework adapter needed) that issues short-lived
// client upload tokens for /admin/upload. Gated by ADMIN_UPLOAD_SECRET so the
// public site can't be used to fill up the Blob store.
export default async function handler(request: Request): Promise<Response> {
  const secret = process.env.ADMIN_UPLOAD_SECRET;
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        if (!secret || clientPayload !== secret) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"],
          addRandomSuffix: true,
        };
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
