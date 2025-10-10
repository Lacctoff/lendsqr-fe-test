import "../../styles/main.scss";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="auth-layout">
      <div className="auth-illustration">
        <div className='logo'>
          <div className='union'>
            <img src="/images/Union.svg" alt="Lendsqr Logo" />
          </div>
          <div className='lendsqr'>
            <img src="/images/lendsqr.svg" alt="Lendsqr Logo" />
          </div>
        </div>
        <img src="/images/sign-in-image.svg" alt="Auth Illustration" />
      </div>
      <div className="auth-form">{children}</div>
    </section>
  );
}
