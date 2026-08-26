const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

function getErrorMessage(
  errorData: unknown,
  fallback: string,
): string {
  if (
    typeof errorData !== "object" ||
    errorData === null ||
    !("detail" in errorData)
  ) {
    return fallback;
  }

  const detail = errorData.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((error) => {
        if (
          typeof error === "object" &&
          error !== null &&
          "msg" in error &&
          typeof error.msg === "string"
        ) {
          return error.msg;
        }

        return "Invalid input.";
      })
      .join(" ");
  }

  return fallback;
}

export async function loginUser(
  email: string,
  password: string,
) {
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
      getErrorMessage(
        errorData,
        "Unable to log in. Please try again.",
      ),
    );
  }

  return response.json();
}

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  date_of_birth?: string;
  height_cm?: number;
};

export async function registerUser(
  user: RegisterUserInput,
) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      getErrorMessage(
        errorData,
        "Unable to create account.",
      ),
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
      getErrorMessage(
        errorData,
        "Unable to load dashboard.",
      ),
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

export type HealthMetric = {
  id: number;
  user_id: number;
  heart_rate: number | null;
  weight_kg: number | null;
  steps: number | null;
  sleep_hours: number | null;
  recorded_at: string;
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
      getErrorMessage(
        errorData,
        "Unable to save health metrics.",
      ),
    );
  }

  return response.json();
}

export async function getHealthMetrics(): Promise<HealthMetric[]> {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/health-metrics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      getErrorMessage(
        errorData,
        "Unable to load health history.",
      ),
    );
  }

  return response.json();
}

export async function updateHealthMetric(
  metricId: number,
  metric: HealthMetricInput,
) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(
    `${API_URL}/health-metrics/${metricId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(metric),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      getErrorMessage(
        errorData,
        "Unable to update health metric.",
      ),
    );
  }

  return response.json();
}

export async function deleteHealthMetric(
  metricId: number,
) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(
    `${API_URL}/health-metrics/${metricId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      getErrorMessage(
        errorData,
        "Unable to delete health metric.",
      ),
    );
  }
}