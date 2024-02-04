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
