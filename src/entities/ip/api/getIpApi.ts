// Форма ответа ipify: https://api.ipify.org?format=json
interface IpifyResponse {
  readonly ip: string;
}

const IP_API_URL = "https://api.ipify.org?format=json";

export async function getIpApi(): Promise<string> {
  const response = await fetch(IP_API_URL);

  if (!response.ok) {
    throw new Error(
      `ipify вернул код ${response.status} ${response.statusText}`,
    );
  }

  const data: IpifyResponse = await response.json();

  return data.ip;
}
