const API_URL = "http://127.0.0.1:8000";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Unable to log in. Please try again.",
    );
  }

  return response.json();
}
export async function getDashboard() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Unable to load dashboard.",
    );
  }

  return response.json();
}

export type HealthMetricInput = {
  heart_rate?: number;
  weight_kg?: number;
  steps?: number;
  sleep_hours?: number;
};

export async function createHealthMetric(
  metric: HealthMetricInput,
) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/health-metrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(metric),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Unable to save health metrics.",
    );
  }

  return response.json();
}