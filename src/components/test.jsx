// import React, { useState } from 'react';
// import { Calendar } from './ui/calendar';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
// import { Button } from './ui/button';
// import { Label } from './ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { services } from '../mockData';
// import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

// const BookingModal = ({ open, onOpenChange }) => {
//   const [date, setDate] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     time: '',
//     notes: ''
//   });

//   const timeSlots = [
//     '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
//     '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
//     '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
//     '6:00 PM', '6:30 PM', '7:00 PM'
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Mock submission - will be connected to backend later
//     console.log('Booking submitted:', {
//       ...formData,
//       date: date?.toLocaleDateString()
//     });

//     // Show success message (mock)
//     alert(`Thank you for booking! We'll confirm your appointment for ${date?.toLocaleDateString()} at ${formData.time} shortly.`);

//     // Reset form
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       service: '',
//       time: '',
//       notes: ''
//     });
//     setDate(null);
//     onOpenChange(false);
//   };

//   const isFormValid = () => {
//     return date && formData.name && formData.email && formData.phone && formData.service && formData.time;
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold" style={{ color: 'var(--color-sage-dark)', fontFamily: 'var(--font-heading)' }}>
//             Book Your Appointment
//           </DialogTitle>
//           <p className="text-sm" style={{ color: 'var(--color-warm-gray)' }}>
//             Select your preferred date, time, and service below
//           </p>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Left Column - Calendar */}
//             <div>
//               <Label className="text-lg font-semibold mb-3 block flex items-center gap-2" style={{ color: 'var(--color-sage-dark)' }}>
//                 <CalendarIcon size={20} />
//                 Select Date
//               </Label>
//               <div className="border rounded-lg p-4 bg-white" style={{ borderColor: 'var(--color-sage-light)' }}>
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
//                   className="rounded-md"
//                 />
//               </div>
//               {date && (
//                 <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--color-sage)' }}>
//                   Selected: {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                 </p>
//               )}
//             </div>

//             {/* Right Column - Form Fields */}
//             <div className="space-y-4">
//               {/* Name */}
//               <div>
//                 <Label htmlFor="name" className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-sage-dark)' }}>
//                   <User size={16} />
//                   Full Name *
//                 </Label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter your full name"
//                   className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
//                   style={{ borderColor: 'var(--color-sage-light)' }}
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <Label htmlFor="email" className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-sage-dark)' }}>
//                   <Mail size={16} />
//                   Email Address *
//                 </Label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="your.email@example.com"
//                   className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
//                   style={{ borderColor: 'var(--color-sage-light)' }}
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <Label htmlFor="phone" className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-sage-dark)' }}>
//                   <Phone size={16} />
//                   Phone Number *
//                 </Label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="(770) 123-4567"
//                   className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
//                   style={{ borderColor: 'var(--color-sage-light)' }}
//                 />
//               </div>

//               {/* Service Selection */}
//               <div>
//                 <Label htmlFor="service" className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-sage-dark)' }}>
//                   Service Type *
//                 </Label>
//                 <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
//                   <SelectTrigger className="w-full" style={{ borderColor: 'var(--color-sage-light)' }}>
//                     <SelectValue placeholder="Choose a service" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {services.map((service) => (
//                       <SelectItem key={service.id} value={service.name}>
//                         {service.name} - {service.price}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Time Selection */}
//               <div>
//                 <Label htmlFor="time" className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-sage-dark)' }}>
//                   <Clock size={16} />
//                   Preferred Time *
//                 </Label>
//                 <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
//                   <SelectTrigger className="w-full" style={{ borderColor: 'var(--color-sage-light)' }}>
//                     <SelectValue placeholder="Select a time slot" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {timeSlots.map((time) => (
//                       <SelectItem key={time} value={time}>
//                         {time}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Notes - Full Width */}
//           <div>
//             <Label htmlFor="notes" className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-sage-dark)' }}>
//               <MessageSquare size={16} />
//               Special Requests or Notes (Optional)
//             </Label>
//             <textarea
//               id="notes"
//               name="notes"
//               value={formData.notes}
//               onChange={handleInputChange}
//               placeholder="Any special requests, concerns, or areas you'd like us to focus on..."
//               rows={4}
//               className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
//               style={{ borderColor: 'var(--color-sage-light)' }}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex gap-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="flex-1 border-2"
//               style={{ borderColor: 'var(--color-sage)', color: 'var(--color-sage)' }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={!isFormValid()}
//               className="flex-1 bg-[#8B9D83] hover:bg-[#6B7D63] text-white disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Confirm Booking
//             </Button>
//           </div>

//           <p className="text-xs text-center" style={{ color: 'var(--color-warm-gray)' }}>
//             * Required fields. We'll contact you shortly to confirm your appointment.
//           </p>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BookingModal;

// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         caption: "flex justify-center pt-1 relative items-center",
//         caption_label: "text-sm font-medium",
//         nav: "space-x-1 flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start: "day-range-start",
//         day_range_end: "day-range-end",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ className, ...props }) => (
//           <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
//         ),
//         IconRight: ({ className, ...props }) => (
//           <ChevronRight className={cn("h-4 w-4", className)} {...props} />
//         ),
//       }}
//       {...props} />
//   );
// }
// Calendar.displayName = "Calendar"

// export { Calendar }

import React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronDown, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import "react-day-picker/style.css";

const CustomDayPicker = () => {
  const [selected, setSelected] =
    (React.useState < Date) | (undefined > undefined);

  const defaultClassNames = getDefaultClassNames();

  const handleDayClick = (day) => {
    setSelected(day);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg text-orange-500 font-bold">
        React Date Picker Example
      </p>
      <p className="text-sm text-gray-500">
        Selected date: {selected?.toLocaleDateString()}
      </p>
      <DayPicker
        mode="single"
        onSelect={handleDayClick}
        selected={selected}
        classNames={{
          selected: `text-white`,
          root: `${defaultClassNames.root} shadow-lg p-5`,
          day: `group  w-10 h-10 rounded-full ${defaultClassNames.day}`,
          caption_label: `text-base`,
        }}
        components={{
          /* Custom Button */
          DayButton: (props) => {
            const { day, ...buttonProps } = props;
            return (
              <button
                {...buttonProps}
                className="bg-zinc-200 w-10 h-10 m-1 group-aria-selected:bg-orange-700 rounded-full"
                onClick={() => setSelected(day.date)}
              />
            );
          },
          /* Custom Chevron Icon */
          Chevron: ({ className, orientation, ...chevronProps }) => {
            switch (orientation) {
              case "left":
                return (
                  <ChevronLeft
                    className={`${className} w-4 h-4 fill-amber-700`}
                    {...chevronProps}
                  />
                );
              case "right":
                return (
                  <ChevronRight
                    className={`${className} w-4 h-4 fill-amber-700`}
                    {...chevronProps}
                  />
                );
              case "down":
                return (
                  <ChevronDown
                    className={`${className} w-4 h-4 fill-amber-700`}
                    {...chevronProps}
                  />
                );
              case "up":
                return (
                  <ChevronDown
                    className={`${className} w-4 h-4 fill-amber-700`}
                    {...chevronProps}
                  />
                );
              default:
                return (
                  <Circle className={`${className} w-4 h-4 fill-amber-700`} />
                );
            }
          },
        }}
      />
    </div>
  );
};
