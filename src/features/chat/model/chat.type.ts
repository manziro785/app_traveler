export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  reply?: string;
  [key: string]: unknown;
};

