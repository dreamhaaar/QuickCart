"use client";

import React, { useState } from "react";
import Link from "next/link";
const VouchersPage = () => {
  const [discount, setDiscount] = useState("");
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      code: "ABCD1234",
      discount: 10,
      owner_id: "Andrea De Leon",
    },
  ]);
  const [checkoutCode, setCheckoutCode] = useState("");
  const [checkoutPrice, setCheckoutPrice] = useState("");
  const [checkoutResult, setCheckoutResult] = useState(null);

  const generateCode = () =>
    Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    const code = generateCode();
    const newVoucher = {
      id: vouchers.length + 1,
      code,
      discount: parseFloat(discount),
      owner_id: "seller_123", // dummy seller ID
    };
    setVouchers((prev) => [...prev, newVoucher]);
    setDiscount("");
  };

  const handleApplyVoucher = () => {
    const voucher = vouchers.find((v) => v.code === checkoutCode.toUpperCase());
    if (!voucher) {
      setCheckoutResult({ error: "Invalid voucher code." });
      return;
    }

    const originalPrice = parseFloat(checkoutPrice);
    const discountAmount = (voucher.discount / 100) * originalPrice;
    const finalPrice = originalPrice - discountAmount;
    const commission = discountAmount * 0.5; // 50% commission

    setCheckoutResult({
      originalPrice,
      finalPrice,
      discountAmount,
      promoterId: voucher.owner_id,
      commission,
      code: voucher.code,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h1 className="text-2xl text-center">Voucher Management</h1>

      {/* Columns for Generate + Simulate */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Generate New Voucher */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg  mb-4">Generate New Voucher</h2>
          <form onSubmit={handleCreateVoucher} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g., 10"
                required
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Generate Voucher
            </button>
          </form>
        </div>

        {/* Right: Simulate Checkout */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg  mb-4">Simulate Checkout</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Voucher Code
              </label>
              <input
                type="text"
                value={checkoutCode}
                onChange={(e) => setCheckoutCode(e.target.value)}
                placeholder="Enter voucher code"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Original Price (₱)
              </label>
              <input
                type="number"
                value={checkoutPrice}
                onChange={(e) => setCheckoutPrice(e.target.value)}
                placeholder="e.g., 1000"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <button
              onClick={handleApplyVoucher}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Apply Voucher
            </button>

            {/* Checkout Result */}
            {checkoutResult && (
              <div className="mt-4 border p-4 rounded bg-gray-50 space-y-2 text-sm">
                {checkoutResult.error ? (
                  <p className="text-red-500">{checkoutResult.error}</p>
                ) : (
                  <>
                    <p>
                      <strong>Voucher Code:</strong> {checkoutResult.code}
                    </p>
                    <p>
                      <strong>Original Price:</strong> ₱
                      {checkoutResult.originalPrice.toFixed(2)}
                    </p>
                    <p>
                      <strong>Discount:</strong> ₱
                      {checkoutResult.discountAmount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Final Price:</strong> ₱
                      {checkoutResult.finalPrice.toFixed(2)}
                    </p>
                    <p>
                      <strong>Promoter:</strong> {checkoutResult.promoterId}
                    </p>
                    <p className="text-green-700 font-semibold">
                      <strong>Commission Earned:</strong> ₱
                      {checkoutResult.commission.toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Voucher List Section */}
      <div className="w-full md:w-1/3">
        <h2 className="text-xl mb-4">Generated Vouchers</h2>
        {vouchers.length === 0 ? (
          <p className="text-gray-500 text-sm">No vouchers yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {vouchers.map((v) => (
              <div
                key={v.id}
                className="border p-4 rounded bg-white shadow-sm space-y-1 text-sm"
              >
                <p>
                  <strong>Code:</strong> {v.code}
                </p>
                <p>
                  <strong>Discount:</strong> {v.discount}%
                </p>
                <p>
                  <strong>Owner:</strong> {v.owner_id}
                </p>
                <Link
                  href={`/seller/vouchers/${v.code}`}
                  className="text-blue-600 underline inline-block mt-2"
                >
                  View Stats
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>


    </div>
  );
};

export default VouchersPage;
