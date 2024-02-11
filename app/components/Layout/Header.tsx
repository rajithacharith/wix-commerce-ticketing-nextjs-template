import { CartBag } from '@app/components/CartBag/CartBag';
import Image, { ImageProps } from 'next/image';
import { NavBar } from './NavBar/NavBar';
import { Login } from '@app/components/Login/Login';
import testIds from '@app/utils/test-ids';

const Header = () => (
  <>
    <header
      className="h-header z-40 w-full"
      data-testid={testIds.LAYOUT.HEADER}
    >
      <div className="flex px-6 sm:px-14 h-header items-center gap-4 sm:gap-8">
        <h2 className="flex-1">
          <a href="/">
            <Image
          src={"https://rotasia2024bengaluru.com/assets/images/logo/logoR.png"}
          quality={90}
          alt={"Rotasia 2024 Bengaluru"}
          width={200}
          height={200}
        /></a>
        </h2>
        <div>
          <Login />
        </div>
        <div>
          <NavBar />
        </div>
      </div>
    </header>
  </>
);

export default Header;
