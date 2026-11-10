export interface IpResponse {
  ip: string;
}

export const getIpApi = async (): Promise<string> => {
  const response = await fetch("https://api.ipify.org?format=json");
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }
  const data: IpResponse = await response.json();
  return data.ip;
};
