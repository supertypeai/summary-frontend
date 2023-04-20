import { loadStripe } from '@stripe/stripe-js';

const PATH = 'http://localhost:8000'
export default class APIService {
    static initStripe() {
        console.log('checking out user')
        return fetch(`${PATH}/api/stripe-config/`, {
            method: "GET",
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        }).then((result) => result.json())
            .then((data) => {
                // Initialize Stripe.js
                console.log(data)
                const stripe = loadStripe(data.publishable_key)
                return stripe
            });
    }

    static checkoutUser() {
        const stripe = this.initStripe();
        console.log(stripe)
        fetch(`${PATH}/api/create-checkout-session/`)
            .then((result) => { return result.json(); })
            .then((data) => {
                console.log(data);
                // Redirect to Stripe Checkout
                return stripe.redirectToCheckout({ sessionId: data.sessionId })
            })
            .then((res) => {
                console.log(res);
            });
    }

    static registerUser(body) {
        return fetch(`${PATH}/api/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status !== 201) {
                throw response;
            }
            return response.json();
        });
    }

    static loginUser(body) {
        return fetch(`${PATH}/api/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status !== 200) {
                throw response;
            }
            return response.json();
        });
    }

    static RequestPasswordEmail(body) {
        return fetch(`${PATH}/api/request-reset-email/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status !== 200) {
                throw response;
            }
            return response.json();
        });
    }

    static ResetPassword(body) {
        return fetch(`${PATH}/api/password-reset-complete/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status !== 200) {
                throw response;
            }
            return response.json();
        });
    }

    static ChangePassword(body, token) {
        return fetch(`${PATH}/api/change-password/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status !== 200) {
                throw response;
            }
            return response.json();
        });
    }
}