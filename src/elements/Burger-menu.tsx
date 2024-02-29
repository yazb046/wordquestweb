import React, { useEffect, useRef, useState } from 'react';

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuLinksRef = useRef<HTMLElement[]>([]);

  const toggleMenu = () => {
    document.body.classList.toggle('_lock');
    setMenuOpen(!isMenuOpen);
  };

  const scrollToElement = (element: HTMLElement) => {
    const yOffset = -document.querySelector('header')!.offsetHeight;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  const onMenuLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const menuLink = e.currentTarget;
    const gotoBlock = document.querySelector(menuLink.dataset.goto!) as HTMLElement;

    if (gotoBlock) {
      if (isMenuOpen) {
        document.body.classList.remove('_lock');
        setMenuOpen(false);
      }

      scrollToElement(gotoBlock);
    }
  };

  useEffect(() => {
    const menuLinks = Array.from(document.querySelectorAll('.menu__link[data-goto]')) as HTMLElement[];
    menuLinksRef.current = menuLinks;

    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });

    return () => {
      menuLinks.forEach((menuLink) => {
        menuLink.removeEventListener('click', onMenuLinkClick);
      });
    };
  }, [isMenuOpen]);

  return (
    <div className={`header__menu menu ${isMenuOpen ? '_active' : ''}`}>
      <div className="menu__icon" onClick={toggleMenu}>
        <span></span>
      </div>
      <nav className={`menu__body ${isMenuOpen ? '_active' : ''}`}>
        <ul className="menu__list">
          <MenuItem dataGoto=".home" label="Главная" onClick={scrollToElement} />
          <MenuItem dataGoto=".about" label="О нас" onClick={scrollToElement} />
          <MenuItem dataGoto=".contacts" label="Контакты" onClick={scrollToElement} />
        </ul>
      </nav>
    </div>
  );
};

interface MenuItemProps {
  dataGoto: string;
  label: string;
  onClick: (element: HTMLElement) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ dataGoto, label, onClick }) => {
  const handleClick = () => {
    const gotoBlock = document.querySelector(dataGoto) as HTMLElement;

    if (gotoBlock) {
      onClick(gotoBlock);
    }
  };

  return (
    <li>
      <a data-goto={dataGoto} href="#" className="menu__link" onClick={handleClick}>
        {label}
      </a>
    </li>
  );
};

export default Menu;
