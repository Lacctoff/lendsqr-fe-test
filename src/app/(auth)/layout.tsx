import "../../styles/main.scss";
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="auth-layout">
      <div className="auth-illustration">
        <div className='logo'>
          <div className='union'>
            <Image src="/images/Union.svg" alt="Lendsqr Logo" width={25} height={25} />
          </div>
          <div className='lendsqr'>
            <Image src="/images/lendsqr.svg" alt="Lendsqr Logo" width={115} height={23} />
          </div>
        </div>
        <Image src="/images/sign-in-image.svg" alt="Auth Illustration" width={600} height={337} priority />
      </div>
      <div className="auth-form">{children}</div>
    </section>
  );
}
