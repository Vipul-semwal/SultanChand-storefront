import { Suspense } from "react";
import { User, ShoppingCart } from "lucide-react"; // Import from lucide-react
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
  console.log("productCategories", productCategories);

  return (
    <div className="wrapper">
      <div className="sticky top-0 inset-x-0 z-50 group">
        <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
          <nav className="content-container flex items-center justify-between w-full h-full">
            <div className="flex-1 basis-0 h-full flex items-center hidden sm:block ">
              <SideMenu regions={regions} />
            </div>

            <div className="flex items-center h-full space-x-3">
  <LocalizedClientLink href="/" className="flex items-center h-full gap-2">
    {/* Logo */}
    <div className="ml-2 hidden sm:block">
      <img src="/logo.png" width="50px" className="min-w-[50px]" />
    </div>

    {/* Text */}
    <div className="flex flex-col">
      <span className="font-bold text-sm sm:text-2xl text-blue-900 uppercase leading-tight text-3xl">
        Sultan Chand & Sons
      </span>
      <p className="text-[10px] sm:text-xs text-gray-700 tracking-wide hidden sm:block  ">
        Publishers of Standard Educational Textbooks
      </p>
    </div>
  </LocalizedClientLink>
</div>


            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <LocalizedClientLink href="/account" data-testid="nav-account-link">
                <User className="w-4 h-4 sm:w-6 sm:h-6 " /> {/* User icon without text */}
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink href="/cart" data-testid="nav-cart-link">
                  <div className="relative">
                    <span className="absolute -top-1 -right-1 block w-4 h-4 text-xs text-white bg-[#EA5900] rounded-full text-center">
                      0
                    </span>
                  </div>
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
