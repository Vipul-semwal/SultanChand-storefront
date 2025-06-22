"use client";

import { Popover, PopoverPanel, Transition } from "@headlessui/react";
import { ArrowRightMini, XMark, BarsThree } from "@medusajs/icons";
import { Text, clx, useToggleState } from "@medusajs/ui";
import { Fragment } from "react";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";
import { HttpTypes } from "@medusajs/types";
import Gallery from "@modules/gallery/components/gallery";

const SideMenuItems = {
  Home: "/",
  // Store: "/store",
  Account: "/account",
  Cart: "/cart",
  Contact: "/contact-us",
  About: "/about",
  FAQ: "/faq",
  Gallery: "/gallery",
};

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState();

  return (
    <div className="h-full ">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <BarsThree className="text-lg sm:text-xl md:text-2xl" />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-[30%] pr-4 sm:pr-0 sm:w-1/4 2xl:w-1/6   h-[calc(100vh-1rem)] z-30 inset-x-0 text-xs sm:text-sm m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(163,173,201,0.5)] rounded-lg justify-between p-4 sm:p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark className="text-base sm:text-lg md:text-xl" />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-4 items-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-base sm:text-lg md:text-xl lg:text-2xl hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-4">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-sm sm:text-base md:text-lg",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="text-[10px] sm:text-xs md:text-sm lg:text-base text-center">
                        © {new Date().getFullYear()} SultanChand. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default SideMenu;
