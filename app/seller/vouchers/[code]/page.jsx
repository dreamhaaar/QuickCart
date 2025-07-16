"use client";

import { useParams } from "next/navigation";

const DUMMY_VOUCHERS = [
  {
    code: "ABCD1234",
    owner_id: "user_001",
    checkouts: 3,
    commissionPerCheckout: 50,
  },
  {
    code: "XYZ98765",
    owner_id: "user_002",
    checkouts: 8,
    commissionPerCheckout: 30,
  },
  {
    code: "SALE2024",
    owner_id: "user_003",
    checkouts: 5,
    commissionPerCheckout: 100,
  },
];

const VoucherStatsPage = () => {
  const { code } = useParams();

  const voucher = DUMMY_VOUCHERS.find(
    (v) => v.code.toLowerCase() === code?.toLowerCase()
  );

  if (!voucher) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Voucher not found</h1>
        <p className="text-gray-500">No data found for this code.</p>
      </div>
    );
  }

  const totalCommission = voucher.checkouts * voucher.commissionPerCheckout;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Voucher Statistics</h1>

      <div className="space-y-3 text-sm border p-4 rounded-md max-w-md bg-gray-50">
        <p><strong>Voucher Code:</strong> {voucher.code}</p>
        <p><strong>Referred By:</strong> {voucher.owner_id}</p>
        <p><strong>Total Checkouts:</strong> {voucher.checkouts}</p>
        <p><strong>Commission / Checkout:</strong> ₱{voucher.commissionPerCheckout}</p>
        <p className="text-green-600 font-semibold">
          <strong>Total Commission:</strong> ₱{totalCommission}
        </p>
      </div>
    </div>
  );
};

export default VoucherStatsPage;
