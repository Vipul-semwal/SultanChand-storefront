"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import Bookcontents from "./book-contents"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    // {
    //   label: "Product Information",
    //   component: <ProductInfoTab product={product} />,
    // },
    {
      label: "Additional Information",
      component: <MetadataInfoTab product={product} />,
    },
    // {
    //   label: "Shipping & Returns",
    //   component: <ShippingInfoTab />,
    // },
    {
      label: "Content",
      component: <Bookcontents product_id={product.id}/>,
    }
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  console.log('prrrrrr',product)
  console.log('prrrfsfd')
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

const MetadataInfoTab = ({ product }: ProductTabsProps) => {
 const { metadata } = product

// Format camelCase or PascalCase keys into normal strings
const formatKey = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim()

// Strip quotes from string values
const cleanValue = (value: any) => {
  if (typeof value === "string") {
    return value.replace(/^"+|"+$/g, "") // remove starting and ending quotes
  }
  return value
}

// Preferred display order
const keyOrder = [
  "ISBN",
  "ISBN13",
  "Size",
  "Pages",
  "Weight",
  "Language",
  "Publishing Year",
  "Edition",
  "Authored By",
  "TC", // Example technical code
]

// Sort metadata based on defined order
const orderedMetadata = keyOrder.map((key) => [
  key,
  metadata?.[key] ?? null
])



 return (
  <div className="py-6">
   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 list-disc pl-5 text-sm text-gray-700">
  {orderedMetadata.map(([key, value], index) => (
    <li key={index}>
      <span className="font-semibold">{formatKey(typeof key === "string" ? key : String(key))}:</span>{" "}
      {value ? cleanValue(value) : "-"}
    </li>
  ))}
</ul>

  </div>
)

};




export default ProductTabs
