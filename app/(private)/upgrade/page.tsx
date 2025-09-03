// app/pricing/page.tsx
"use client";

import {
  RiCheckFill,
  RiRocket2Fill,
  RiVipCrownFill,
  RiVipDiamondFill,
} from "@remixicon/react";
import { useEffect, useState } from "react";

const pricingPlans = [
  {
    name: "Free",
    icon: <RiVipCrownFill size={32} />,
    price: "$0",
    features: [
      "5 GB Storage",
      "Limited collaboration",
      "Basic support",
      "Sync across devices",
    ],
    isPopular: false,
  },
  {
    name: "Regular",
    icon: <RiVipDiamondFill size={32} />,
    price: "$9.99",
    features: [
      "100 GB Storage",
      "Unlimited collaboration",
      "Priority support",
      "Advanced security",
    ],
    isPopular: true,
  },
  {
    name: "Pro",
    icon: <RiRocket2Fill size={32} />,
    price: "$19.99",
    features: [
      "Unlimited Storage",
      "Custom branding",
      "Dedicated account manager",
      "24/7 VIP support",
    ],
    isPopular: false,
  },
];

const userData = {
  currentStorage: 75,
  totalStorage: 100,
  expiryDate: "2025-12-31",
};

const Page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const percentageUsed =
    (userData.currentStorage / userData.totalStorage) * 100;
  const isExpiringSoon =
    new Date(userData.expiryDate) <
    new Date(new Date().setDate(new Date().getDate() + 30));

  return (
    <>
      <main className="flex-1 p-4 overflow-y-auto bg-background text-foreground">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Upgrade Your Storage</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang paling sesuai dengan kebutuhan Anda untuk
            mendapatkan lebih banyak ruang penyimpanan dan fitur premium.
          </p>
        </div>

        {/* Informasi Penggunaan Layanan */}
        <div className="bg-card p-6 rounded-xl border border-border max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-semibold text-foreground">
              Storage Used: {userData.currentStorage} GB of{" "}
              {userData.totalStorage} GB
            </span>
            <span
              className={`text-sm font-medium ${
                isExpiringSoon ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {isExpiringSoon ? "Expiring Soon!" : "Expires:"}{" "}
              {userData.expiryDate}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
        </div>

        {/* Pilihan Paket Harga */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`
                bg-card p-6 rounded-2xl border transition-all duration-300
                ${
                  plan.isPopular
                    ? "border-primary shadow-xl scale-105"
                    : "border-border shadow-md hover:scale-105"
                }
              `}
            >
              <div className="mb-4 text-center">
                {plan.isPopular && (
                  <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <div
                  className={`
                  ${
                    plan.isPopular ? "text-primary" : "text-muted-foreground"
                  } mx-auto mb-2
                `}
                >
                  {plan.icon}
                </div>
                <h2 className="text-xl font-bold mb-1 text-foreground">
                  {plan.name}
                </h2>
                <p className="text-3xl font-extrabold text-foreground">
                  {plan.price}
                </p>
                <p className="text-sm text-muted-foreground mt-1">/ month</p>
              </div>
              <ul className="space-y-2 text-left mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <RiCheckFill className="text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`
                  w-full py-3 rounded-xl font-semibold transition-colors
                  ${
                    plan.isPopular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }
                `}
                onClick={() => alert(`You selected the ${plan.name}`)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Page;
