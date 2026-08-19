import type { Result } from "../types/Result.js";

type Validator<T> =
    (value: unknown) => value is T;

export async function apiFetch<T>(
    url: string,
    validator: Validator<T>,
    options?: RequestInit
): Promise<Result<T>> {
    try {
        const response =
            await fetch(url, options);

        if (!response.ok) {
            return {
                success: false,
                error: `HTTP ${response.status}`
            };
        }

        const data: unknown =
            await response.json();

        if (!validator(data)) {
            return {
                success: false,
                error: "Réponse API invalide."
            };
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error
                ? error.message
                : "Une erreur inconnue est survenue."
        };
    }
}
