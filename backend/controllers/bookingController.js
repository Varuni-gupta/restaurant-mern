import Booking from "../models/bookingModel.js";
export const createBooking = async(req, res) => {
    try {
        const { id } = req.user;
        const { name, phone, numberOfPeople, date, time, note } = req.body;
        if (!name || !phone || !numberOfPeople || !date || !time)
        {
            return res.status(400).json({ message: "All fields are requred",success:false });
        }
        const existingBooking = await Booking.findOne({ date, time, status: { $ne: "Cancelled" } });
        if (existingBooking) {
            return res.status(400).json({ message: "This time slot is already booked", success: false });
        }
            const booking = await Booking.create({ user: id, name, phone, numberOfPeople, date, time, note });
            res.status(201).json({ message: "Table booked successfully", success: true });
        }
    
    catch (error)
    {
        console.log(error);
return res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const getUserBookings = async(req, res)=>
{
    try {
        const { id } = req.user;
        const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    }
      catch (error)
    {
        console.log(error);
 return res.status(500).json({ message: "Server error", error: error.message });
    }
    
}
export const getAllBookings = async(req, res)=>{
    try {
        const bookings = await Booking.find().populate("user", "name email");
        res.status(200).json(bookings);
    }
    catch (error)
    {
        console.log(error);
return res.status(500).json({ message: "Server error", error: error.message });
    }

}
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking)
            return res.status(404).json({ success: false, message: "Booking not found" });
        booking.status = status;
        await booking.save();
        res.status(200).json({ message: "Booking updated successfully", success: true });
    }
    catch (error)
    {
         console.log(error);
return res.status(500).json({ message: "Server error", error: error.message });
    }
    }
