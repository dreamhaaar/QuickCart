"use client";

const DUMMY_VOUCHERS = [
  {
    code: "ABCD1234",
    owner_id: "Andrea De Leon",
    checkouts: 3,
    commissionPerCheckout: 50,
  },
  {
    code: "XYZ98765",
    owner_id: "John Doe",
    checkouts: 8,
    commissionPerCheckout: 30,
  },
  {
    code: "SALE2024",
    owner_id: "Ellen Park",
    checkouts: 5,
    commissionPerCheckout: 100,
  },
];

const VoucherStatsDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">All Voucher Statistics</h1>

      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-4 py-2">Voucher Code</th>
            <th className="border px-4 py-2">Referred By</th>
            <th className="border px-4 py-2">Checkouts</th>
            <th className="border px-4 py-2">Commission/Checkout</th>
            <th className="border px-4 py-2">Total Commission</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_VOUCHERS.map((voucher) => {
            const total = voucher.checkouts * voucher.commissionPerCheckout;
            return (
              <tr key={voucher.code}>
                <td className="border px-4 py-2">{voucher.code}</td>
                <td className="border px-4 py-2">{voucher.owner_id}</td>
                <td className="border px-4 py-2">{voucher.checkouts}</td>
                <td className="border px-4 py-2">₱{voucher.commissionPerCheckout}</td>
                <td className="border px-4 py-2  text-green-600">₱{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherStatsDashboard;
