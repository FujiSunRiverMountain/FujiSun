
export const LoginPage = () => {
  const signOutRedirect = () => {
    const clientId = "584mk52em2ruu20s3q6vthvlms";
    const logoutUri = "http://localhost:5173";
    const cognitoDomain = "https://ap-northeast-1l1ti7rkf2.auth.ap-northeast-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  return (
    <div>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
};