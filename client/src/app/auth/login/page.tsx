const LoginPage = () => {
  return (
    <form>
      <h4>Login to your account.</h4>
      <div>
        <label htmlFor="password">Email</label>
        <input type="text" placeholder="Email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginPage;
