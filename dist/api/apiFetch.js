export async function apiFetch(url, validator, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return {
                success: false,
                error: `HTTP ${response.status}`
            };
        }
        const data = await response.json();
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
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error
                ? error.message
                : "Une erreur inconnue est survenue."
        };
    }
}
