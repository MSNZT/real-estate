// "use client";
// import { Button, Separator } from "@/shared/ui";
// import { getDateValue } from "@/shared/utils/getDateValue";
// import { useCalculatePrice } from "../api/useCalculatePrice";
// import { useBookingWidget } from "../hooks/useBookingDates";
// import { BookingFormConfirmPopup } from "./Form/BookingFormConfirmPopup";
// import { BookingDatePickerLayout } from "./DatePicker/BookingDatePickerLayout";
// import { useRouter } from "next/navigation";
// import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";
// import { useAuth } from "@/entities/user";
// import { getPrettyPrice } from "@/shared/utils/getPrettyPrice";

// interface BookingWidgetProps {
//   adId: string;
//   price: number;
// }
// export const BookingWidget = ({ adId, price }: BookingWidgetProps) => {
//   const {
//     countDays,
//     dates,
//     isOpenBookingPopup,
//     isOpenCalendar,
//     handleApplyCalendar,
//     handleCloseCalendar,
//     handleOpenBookingPopup,
//     handleOpenCalendar,
//   } = useBookingWidget();
//   const { data } = useCalculatePrice(price, countDays);
//   const { isAuth } = useAuth();
//   const router = useRouter();
//   const isDesktop = useClientMediaQuery({
//     minWidth: "1024px",
//   });

//   const totalPrice = getPrettyPrice(data?.totalPrice);
//   const prepayment = getPrettyPrice(data?.prepayment);
//   const remainder = getPrettyPrice(data?.remainder);

//   const selectedDates = getDateValue({ from: dates?.[0], to: dates?.[1] });

//   const renderButtonBookingPopup = () => {
//     return (
//       <Button
//         onClick={
//           !isAuth
//             ? () => router.push("/auth/login")
//             : () => handleOpenBookingPopup(true)
//         }
//         size="clear"
//         className="flex flex-col gap-0 p-2 bg-primary text-white rounded-lg mt-2 h-12 justify-center w-full hover:bg-primary-dark"
//       >
//         <p>
//           Забронировать на {getDateValue({ from: dates?.[0], to: dates?.[1] })}
//         </p>
//       </Button>
//     );
//   };

//   if (isDesktop) {
//     return (
//       <div>
//         <p className="font-bold mb-1">Заселение и выезд</p>
//         {/* {renderDateSelectButton()} */}
//         {/* {!dates && renderCalendarButton()} */}

//         <div className="relative">
//           <BookingDatePickerLayout
//             className="absolute top-10 right-0 w-[540px]"
//             isMobile={!isDesktop}
//             adId={adId}
//             isOpen={isOpenCalendar}
//             handleApply={handleApplyCalendar}
//             // handleOpen={handleOpenBookingPopup}
//             handleClose={handleCloseCalendar}
//           />
//         </div>

//         {data && (
//           <div className="flex flex-col gap-3">
//             {renderButtonBookingPopup()}
//             <div className="flex justify-between">
//               <p>
//                 {getPrettyPrice(price)} × {countDays} суток
//               </p>
//               <p>{totalPrice}</p>
//             </div>

//             <Separator />

//             <div className="flex justify-between font-bold mb-2">
//               <p>Итого</p>
//               <p>{totalPrice}</p>
//             </div>
//             <BookingFormConfirmPopup
//               adId={adId}
//               price={price}
//               dates={dates}
//               isOpen={isOpenBookingPopup}
//               onClose={() => handleOpenBookingPopup(false)}
//               countDays={countDays}
//               prepayment={prepayment}
//               remainder={remainder}
//               totalPrice={totalPrice}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col justify-center">
//       <BookingDatePickerLayout
//         isMobile={!isDesktop}
//         adId={adId}
//         isOpen={isOpenCalendar}
//         handleApply={handleApplyCalendar}
//         handleClose={handleCloseCalendar}
//       />
//       {renderDateSelectButton()}
//       {renderCalendarButton()}
//       {renderButtonBookingPopup()}
//       <BookingFormConfirmPopup
//         adId={adId}
//         dates={dates}
//         isOpen={isOpenBookingPopup}
//         onClose={() => handleOpenBookingPopup(false)}
//         price={price}
//         countDays={countDays}
//         prepayment={prepayment}
//         remainder={remainder}
//         totalPrice={totalPrice}
//       />
//     </div>
//   );
// };
