import React from 'react';


function SignUp({ onClose }) {
    return (
        <div className="hhhhh">
            <h2>Sign Up Form</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" required />
                </label>
                <label>
                    Пароль:
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Регистрация</button>
            </form>
        </div>
    );
}

export default SignUp;