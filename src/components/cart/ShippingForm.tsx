
interface ShippingFormProps {
  address: string;
  setAddress: (address: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

const ShippingForm = ({ address, setAddress, phone, setPhone }: ShippingFormProps) => {
  return (
    <div className="space-y-4 mt-4 border-t pt-4">
      <h3 className="font-medium mb-2">Shipping Information</h3>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Shipping Address
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full min-h-[100px] p-2 border rounded-md"
          placeholder="Enter your full shipping address"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your phone number"
          required
        />
      </div>
    </div>
  );
};

export default ShippingForm;
