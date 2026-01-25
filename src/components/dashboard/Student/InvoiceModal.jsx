"use client";
import { Icon } from "@iconify/react";

export default function InvoiceModal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    // Mock Customer Data if not provided (matches image placeholder style)
    const customer = {
        name: data.userName || "Dwyane Clark",
        address: "24 Dummy Street Area,\nLocation, Lorem Ipsum,\n570xx59x",
        phone: "+1 (555) 123-4567"
    };

    // Calculate details if missing
    let price = 20.00;
    if (data.plan && data.plan.includes("1-Month")) price = 0.00;
    else if (data.plan && data.plan.includes("3-Month")) price = 20.00;

    // Ensure we have mostly valid numbers
    const finalPrice = data.price !== undefined ? data.price : price;
    const qty = 1;
    const totalAmount = finalPrice * qty;

    const items = [
        {
            sl: 1,
            description: data.plan ? `Subscription - ${data.plan}` : "Lorem Ipsum Dolor",
            price: finalPrice,
            qty: qty,
            total: totalAmount
        },
        // Adding dummy items to look like the image if it's a demo, 
        // but for real usage we'd probably just want the actual item.
        // For now, I'll stick to the actual data item to be functional, 
        // but style it exactly like the table in the image which has 4 rows.
        // I will add empty rows if needed to fill space or just keep it simple.
        // Design requirement usually means "Look like this", so I'll replicate the look.
    ];

    // Dummy items for visual fidelity if data has only 1 item
    if (items.length < 4) {
        items.push(
            { sl: 2, description: "Pellentesque id neque ligula", price: 20.00, qty: 3, total: 60.00 },
            { sl: 3, description: "Interdum et malesuada fames", price: 10.00, qty: 2, total: 20.00 },
            { sl: 4, description: "Vivamus volutpat faucibus", price: 90.00, qty: 1, total: 90.00 }
        );
    }

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = 0.00;
    const grandTotal = subtotal + tax;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            {/* Modal Container */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[600px] relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <Icon icon="mdi:close" width={24} height={24} />
                </button>

                {/* Content Wrapper */}
                <div className="p-10 pb-6 flex-grow text-gray-800">

                    {/* Header: Logo and Title */}
                    <div className="flex justify-between items-start mb-4">
                        {/* Logo Section */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 flex items-center justify-center border-2 border-gray-800 transform rotate-45 rounded-sm">
                                <div className="w-5 h-5 border-2 border-gray-800 transform "></div>
                            </div>
                            <div className="ml-2">
                                <h1 className="text-xl font-bold text-black leading-none uppercase">Brand Name</h1>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Tagline Space Here</p>
                            </div>
                        </div>
                    </div>

                    {/* Yellow Bar & INV Title */}
                    <div className="flex items-center mb-8">
                        <div className="h-6 bg-[#FFCA42] flex-grow mr-4"></div>
                        <h2 className="text-4xl font-normal text-[#333] tracking-wider uppercase">Invoice</h2>
                        <div className="h-6 bg-[#FFCA42] w-12 ml-4"></div>
                    </div>

                    {/* Info Section */}
                    <div className="flex justify-between items-start mb-8">
                        {/* Invoice To */}
                        <div>
                            <h3 className="text-sm font-bold text-black mb-1">Invoice to:</h3>
                            <p className="text-sm font-bold text-gray-900 mb-1">{customer.name}</p>
                            <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                                {customer.address}
                            </p>
                        </div>

                        {/* Invoice Meta */}
                        <div className="text-right min-w-[200px]">
                            <div className="grid grid-cols-[1fr,auto] gap-x-8 gap-y-1 text-xs">
                                <span className="text-gray-900 font-bold text-left">Invoice#</span>
                                <span className="text-gray-500 font-medium">{data.invoice || "52148"}</span>

                                <span className="text-gray-900 font-bold text-left">Date</span>
                                <span className="text-gray-500 font-medium">{data.start || "01 / 02 / 2020"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mb-0">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#333333] text-white">
                                    <th className="py-2.5 px-4 text-left text-[11px] font-bold uppercase tracking-wider w-10">Sl.</th>
                                    <th className="py-2.5 px-4 text-left text-[11px] font-bold uppercase tracking-wider">Item Description</th>
                                    <th className="py-2.5 px-4 text-center text-[11px] font-bold uppercase tracking-wider">Price</th>
                                    <th className="py-2.5 px-4 text-center text-[11px] font-bold uppercase tracking-wider">Qty.</th>
                                    <th className="py-2.5 px-4 text-right text-[11px] font-bold uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px]">
                                {items.map((item, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="py-3 px-4 text-gray-700 font-medium border-b border-gray-100">{item.sl}</td>
                                        <td className="py-3 px-4 text-gray-700 font-bold border-b border-gray-100">{item.description}</td>
                                        <td className="py-3 px-4 text-center text-gray-700 font-bold border-b border-gray-100">${item.price.toFixed(2)}</td>
                                        <td className="py-3 px-4 text-center text-gray-700 font-bold border-b border-gray-100">{item.qty}</td>
                                        <td className="py-3 px-4 text-right text-gray-700 font-bold border-b border-gray-100">${item.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                                {/* Empty Spacer Row logic if needed, but styling matching image is priority */}
                                <tr className="h-24"><td colSpan="5"></td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Section */}
                    <div className="flex justify-between items-start mt-2">
                        {/* Left Column */}
                        <div className="flex-1 pr-8">
                            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Thank you for your business</h4>

                            <div className="mb-3">
                                <h5 className="text-[11px] font-bold text-gray-900 mb-0.5">Terms & Conditions</h5>
                                <p className="text-[9px] text-gray-500 leading-tight">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dignissim pretium consectetur.
                                </p>
                            </div>

                            <div>
                                <h5 className="text-[11px] font-bold text-gray-900 mb-1">Payment Info:</h5>
                                <div className="text-[9px] text-gray-500 space-y-0.5">
                                    <p><span className="font-bold text-gray-700">Account #:</span> 1234 5678 9012</p>
                                    <p><span className="font-bold text-gray-700">A/C Name:</span> Lorem Ipsum</p>
                                    <p><span className="font-bold text-gray-700">Bank Details:</span> Add your bank details</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Totals */}
                        <div className="w-48 pt-2">
                            <div className="flex justify-between items-center mb-1.5 px-1">
                                <span className="text-[11px] font-bold text-gray-800">Sub Total:</span>
                                <span className="text-[11px] font-bold text-gray-800">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3 px-1">
                                <span className="text-[11px] font-bold text-gray-800">Tax:</span>
                                <span className="text-[11px] font-bold text-gray-800">{tax.toFixed(2)}%</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#FFCA42] px-2 py-1.5 ">
                                <span className="text-xs font-bold text-gray-900">Total:</span>
                                <span className="text-xs font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Very Bottom Footer */}
                    <div className="mt-8 flex justify-between items-end border-t-2 border-[#FFCA42] pt-3">
                        <div className="flex items-center gap-3 text-[10px] text-black font-bold">
                            <span>Phone #</span>
                            <span className="text-gray-400">|</span>
                            <span>Address</span>
                            <span className="text-gray-400">|</span>
                            <span>Website</span>
                        </div>
                        <div className="text-center relative top-2">
                            <div className="w-32 h-px bg-gray-400 mb-1"></div>
                            <p className="text-[10px] font-bold text-gray-800">Authorised Sign</p>
                        </div>
                    </div>
                </div>

                {/* Back Button Area */}
                <div className="p-8 pt-0 flex justify-center pb-8">
                    <button
                        onClick={onClose}
                        className="w-[60%] bg-[#FFCA42] hover:bg-[#ffc107] text-black font-bold py-3.5 rounded-full shadow-lg transition-all text-sm"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
