import * as uniqid from "uniqid";
import * as mime from "mime-to-extensions";

const signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png"
};

export const fileName = (b64) => `${uniqid()}.${mime.extension(detectMimeType(b64))}`;

export function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}