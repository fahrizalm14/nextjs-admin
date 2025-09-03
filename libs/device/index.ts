// "client"

export function getDeviceId(): string {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    deviceId = `device-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`; // generate UUID unik
    localStorage.setItem("device_id", deviceId);
  }
  return deviceId;
}

// lib/location.ts
export interface GeoInfo {
  ip: string;
  city: string;
  region?: string;
  country?: string;
}
export async function getGeoByIp(ip: string): Promise<GeoInfo> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);

    console.log(res.status);

    const data = await res.json();
    return {
      ip,
      city: data.city || "Unknown",
      region: data.region || undefined,
      country: data.country_name || undefined,
    };
  } catch (err) {
    console.warn("getGeoByIp fetch failed:", err);
    return { ip, city: "Unknown" }; // fallback
  }
}
