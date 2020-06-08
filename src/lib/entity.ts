export const renderData = (data: Record<string, any>): string =>
  Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
