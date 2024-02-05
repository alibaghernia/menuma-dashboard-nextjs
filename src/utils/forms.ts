import { MessageInstance } from "antd/lib/message/interface";

export const errorHandling = (
  data: any,
  message: MessageInstance,
  fieldsLabels: Record<string, string>
) => {
  switch (data?.code) {
    case 1: {
      const fields: string[] = data?.fields;
      fields.map((field) => {
        message.error(
          `${fieldsLabels[field as keyof typeof fieldsLabels]!} تکراری است!`
        );
      });
      break;
    }
    default:
      return true;
  }
};
export function printCanvas(className: string, isCanvas: boolean = true) {
  let canvas: HTMLCanvasElement = document?.querySelector(`.${className}`)!;
  if (!isCanvas) canvas = canvas.querySelector("canvas")!;
  console.log({
    canvas,
  });
  if (!canvas) return;
  const dataUrl = (canvas as HTMLCanvasElement).toDataURL();
  var windowContent = "<!DOCTYPE html>";
  windowContent += "<html>";
  windowContent += "<head><title>Print canvas</title></head>";
  windowContent += "<body style='width:90vw;height:90vh'>";
  windowContent +=
    '<img style="width:500px;height:500px;object-fit:contain" src="' +
    dataUrl +
    '">';
  windowContent += "</body>";
  windowContent += "</html>";
  var printWin = window.open(
    "",
    "",
    `width=${window.innerWidth},height=${window.innerHeight}`
  );
  printWin;
  printWin?.document.open();
  printWin?.document.write(windowContent);
  printWin?.document.close();
  printWin?.focus();
  if (printWin?.print()) printWin?.close();
}
