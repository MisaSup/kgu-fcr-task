interface IpifyResponse {
  ip: string;
}

export const getIpApi = async (): Promise<string> => {
  const response = await fetch("https://api.ipify.org?format=json");

  if (!response.ok) {
    throw new Error(
      `Не удалось получить IP: ${response.status} ${response.statusText}`,
    );
  }

  const data: IpifyResponse = await response.json();

  if (!data.ip) {
    throw new Error("API вернул пустой ответ");
  }

  return data.ip;
};
