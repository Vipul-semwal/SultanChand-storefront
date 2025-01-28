import { Suspense } from "react";
import { User, ShoppingCart } from "lucide-react";  // Import from lucide-react
import { listRegions } from "@lib/data/regions";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import { listCategories } from "@lib/data/categories";
import Menu from "@modules/layout/components/menu";

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);
  const productCategories = await listCategories();
  console.log('productCategories', productCategories);

  return (
    <div className="wrapper">
      <div className="sticky top-0 inset-x-0 z-50 group">
        <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            <div className="flex-1 basis-0 h-full flex items-center">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div>

            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                <img
                  className="max-w-[50px] md:max-w-[60px] lg:max-w-[50px] w-auto h-auto"
                  src="/logo.png"
                  alt="Logo"
                />
              </LocalizedClientLink>
            </div>


            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex items-center gap-2"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <User className="w-4 h-4" /> Account  {/* User icon */}
                </LocalizedClientLink>
              </div>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <div className="relative">
                      <ShoppingCart className="w-4 h-4" /> {/* ShoppingCart icon */}
                      <span className="absolute top-0 right-0 block w-4 h-4 text-xs text-white bg-blue-800 rounded-full text-center">0</span>
                    </div>
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
      <Menu />
    </div>
  );
}
