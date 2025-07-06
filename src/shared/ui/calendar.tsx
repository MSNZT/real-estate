// // "use client";

// // import * as React from "react";
// // import {
// //   ChevronDownIcon,
// //   ChevronLeftIcon,
// //   ChevronRightIcon,
// // } from "lucide-react";
// // import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

// // import { cn } from "@/shared/lib/utils";
// // import { Button, buttonVariants } from "@/shared/ui/button";
// // import { ru } from "react-day-picker/locale";

// // import "./ccc.css";

// // function Calendar({
// //   className,
// //   classNames,
// //   showOutsideDays = true,
// //   captionLayout = "label",
// //   buttonVariant = "ghost",
// //   formatters,
// //   components,
// //   ...props
// // }: React.ComponentProps<typeof DayPicker> & {
// //   buttonVariant?: React.ComponentProps<typeof Button>["variant"];
// // }) {
// //   const defaultClassNames = getDefaultClassNames();

// //   return (
// //     <DayPicker
// //       locale={ru}
// //       startMonth={new Date()}
// //       showOutsideDays={showOutsideDays}
// //       className={cn(
// //         "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
// //         String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
// //         String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
// //         className
// //       )}
// //       captionLayout={captionLayout}
// //       formatters={{
// //         formatMonthDropdown: (date) =>
// //           date.toLocaleString("default", { month: "short" }),
// //         ...formatters,
// //       }}
// //       modifiersClassNames={{
// //         range_preview: "bg-accent/40",
// //       }}
// //       classNames={{
// //         root: cn("w-fit", defaultClassNames.root),
// //         months: cn(
// //           "flex gap-4 flex-col md:flex-row relative",
// //           defaultClassNames.months
// //         ),
// //         month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
// //         nav: cn(
// //           "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
// //           defaultClassNames.nav
// //         ),
// //         button_previous: cn(
// //           buttonVariants({ variant: buttonVariant }),
// //           "size-(--cell-size) aria-disabled:opacity-0 aria-disabled:cursor-auto p-0 select-none cursor-pointer",
// //           defaultClassNames.button_previous
// //         ),
// //         button_next: cn(
// //           buttonVariants({ variant: buttonVariant }),
// //           "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
// //           defaultClassNames.button_next
// //         ),
// //         month_caption: cn(
// //           "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
// //           defaultClassNames.month_caption
// //         ),
// //         dropdowns: cn(
// //           "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
// //           defaultClassNames.dropdowns
// //         ),
// //         dropdown_root: cn(
// //           "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
// //           defaultClassNames.dropdown_root
// //         ),
// //         dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
// //         caption_label: cn(
// //           "select-none font-medium",
// //           captionLayout === "label"
// //             ? "text-md font-bold capitalize"
// //             : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
// //           defaultClassNames.caption_label
// //         ),
// //         table: "w-full border-collapse",
// //         weekdays: cn("flex", defaultClassNames.weekdays),
// //         weekday: cn(
// //           "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none capitalize mb-3",
// //           defaultClassNames.weekday
// //         ),
// //         week: cn("flex w-full mt-2", defaultClassNames.week),
// //         week_number_header: cn(
// //           "select-none w-(--cell-size)",
// //           defaultClassNames.week_number_header
// //         ),
// //         week_number: cn(
// //           "text-[0.8rem] select-none text-muted-foreground",
// //           defaultClassNames.week_number
// //         ),
// //         day: cn(
// //           "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
// //           defaultClassNames.day
// //         ),
// //         range_start: cn(
// //           "rounded-l-md bg-accent",
// //           defaultClassNames.range_start
// //         ),
// //         range_middle: cn("rounded-none", defaultClassNames.range_middle),
// //         range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
// //         today: cn(defaultClassNames.today),
// //         outside: cn(
// //           "text-muted-foreground aria-selected:text-muted-foreground",
// //           defaultClassNames.outside
// //         ),
// //         disabled: cn(
// //           "text-muted-foreground opacity-50 bg-gray-300",
// //           defaultClassNames.disabled
// //         ),
// //         hidden: cn("invisible", defaultClassNames.hidden),
// //         ...classNames,
// //       }}
// //       components={{
// //         Root: ({ className, rootRef, ...props }) => {
// //           return (
// //             <div
// //               data-slot="calendar"
// //               ref={rootRef}
// //               className={cn(className)}
// //               {...props}
// //             />
// //           );
// //         },
// //         Chevron: ({ className, orientation, ...props }) => {
// //           if (orientation === "left") {
// //             return (
// //               <ChevronLeftIcon className={cn("size-4", className)} {...props} />
// //             );
// //           }

// //           if (orientation === "right") {
// //             return (
// //               <ChevronRightIcon
// //                 className={cn("size-4", className)}
// //                 {...props}
// //               />
// //             );
// //           }

// //           return (
// //             <ChevronDownIcon className={cn("size-4", className)} {...props} />
// //           );
// //         },
// //         DayButton: CalendarDayButton,
// //         WeekNumber: ({ children, ...props }) => {
// //           return (
// //             <td {...props}>
// //               <div className="flex size-(--cell-size) items-center justify-center text-center">
// //                 {children}
// //               </div>
// //             </td>
// //           );
// //         },
// //         ...components,
// //       }}
// //       {...props}
// //     />
// //   );
// // }

// // function CalendarDayButton({
// //   className,
// //   day,
// //   modifiers,
// //   ...props
// // }: React.ComponentProps<typeof DayButton>) {
// //   const defaultClassNames = getDefaultClassNames();

// //   const ref = React.useRef<HTMLButtonElement>(null);
// //   React.useEffect(() => {
// //     if (modifiers.focused) ref.current?.focus();
// //   }, [modifiers.focused]);

// //   return (
// //     <Button
// //       ref={ref}
// //       variant="ghost"
// //       size="sm"
// //       data-day={day.date.toLocaleDateString("ru-RU", {
// //         day: "2-digit",
// //         month: "2-digit",
// //         year: "numeric",
// //         timeZone: "UTC",
// //       })}
// //       data-selected-single={
// //         modifiers.selected &&
// //         !modifiers.range_start &&
// //         !modifiers.range_end &&
// //         !modifiers.range_middle
// //       }
// //       data-range-start={modifiers.range_start}
// //       data-range-end={modifiers.range_end}
// //       data-range-middle={modifiers.range_middle}
// //       data-disabled={modifiers.disabled}
// //       className={cn(
// //         "relative data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:rounded-none w-8 h-8 data-[range-start=true]:bg-red-500 data-[range-end=true]:bg-red-500 cursor-pointer",
// //         // "relative data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]::before:absolute data-[range-end=true]:rounded-l-xl data-[range-end=true]:rounded-xl data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-xl data-[range-start=true]:rounded-l-xl data-[range-start=true]:rounded-r-xl [&>span]:text-xs [&>span]:opacity-70 cursor-pointer",
// //         defaultClassNames.day,
// //         className
// //       )}
// //       {...props}
// //     />
// //   );
// // }

// // export { Calendar, CalendarDayButton };

// "use client";

// import * as React from "react";
// import {
//   DayPicker,
//   getDefaultClassNames,
//   useDayPicker,
//   dateMatchModifiers,
// } from "react-day-picker";
// import { cn } from "@/shared/lib/utils";
// import { Button, buttonVariants } from "@/shared/ui/button";
// import {
//   addDays,
//   endOfMonth,
//   getDay,
//   isSameDay,
//   startOfDay,
//   startOfMonth,
//   subDays,
// } from "date-fns";
// import { ru } from "react-day-picker/locale";

// // Прокидываем week, idx, modifiersMap
// function CalendarWeek({
//   week,
//   buttonVariant = "ghost",
//   ...props
// }: {
//   week: Date[];
//   buttonVariant: string;
//   props: any;
// }) {
//   const context = useDayPicker();
//   console.log(props);

//   const isDisabled = (date: Date) => {
//     if (!context.dayPickerProps.disabled) return false;

//     // Если это массив matchers
//     if (Array.isArray(context.dayPickerProps.disabled)) {
//       return context.dayPickerProps.disabled.some((d) =>
//         dateMatchModifiers(date, d)
//       );
//     }

//     // Если это один matcher
//     return dateMatchModifiers(date, context.dayPickerProps.disabled);
//   };

//   return (
//     <tr className={context.classNames.week} {...props}>
//       {week.days.map((date: Date, index: number) => {
//         const disabled = isDisabled(date.date);

//         return (
//           <td
//             key={index}
//             aria-disabled={disabled}
//             className={`p-1 text-center rdp-week ${
//               disabled ? "text-gray-400 cursor-not-allowed" : ""
//             }`}
//           >
//             <CalendarDayButton dayObj={date.date.getDate()} modifiers={{}} />
//           </td>
//         );
//       })}
//     </tr>
//   );
// }

// // Аналог вашей getDisabledDayClassName
// function getDisabledDayClassName(
//   day: Date,
//   weekDays: Date[],
//   dayIdx: number,
//   modifiersMap: Record<string, any>
// ): string {
//   const norm = startOfDay(day);
//   const monthStart = startOfMonth(norm);
//   const monthEnd = endOfMonth(norm);

//   const isDisabled = modifiersMap[day.toDateString()]?.disabled;
//   if (!isDisabled) return "";

//   const prev = weekDays[dayIdx - 1];
//   const next = weekDays[dayIdx + 1];

//   const isPrevInMonth = !!prev && prev >= monthStart && prev <= monthEnd;
//   const isNextInMonth = !!next && next >= monthStart && next <= monthEnd;

//   const isPrevDisabled =
//     isPrevInMonth && prev && modifiersMap[prev.toDateString()]?.disabled;
//   const isNextDisabled =
//     isNextInMonth && next && modifiersMap[next.toDateString()]?.disabled;

//   const dayOfWeek = getDay(norm);
//   const isFirstDayOfWeek = dayIdx === 0;
//   const isLastDayOfWeek = dayIdx === weekDays.length - 1;

//   if (!isPrevDisabled && !isNextDisabled) {
//     return "calendar__day--disabled-single";
//   }

//   if (!isNextInMonth || isLastDayOfWeek) {
//     if (!isPrevDisabled) {
//       return "calendar__day--disabled-single";
//     } else {
//       return "calendar__day--disabled-range-end";
//     }
//   }

//   if (!isPrevInMonth || isFirstDayOfWeek) {
//     if (!isNextDisabled) {
//       return "calendar__day--disabled-single";
//     } else {
//       return "calendar__day--disabled-range-start";
//     }
//   }

//   if (!isPrevDisabled && isNextDisabled) {
//     return "calendar__day--disabled-range-start";
//   }
//   if (isPrevDisabled && !isNextDisabled) {
//     return "calendar__day--disabled-range-end";
//   }
//   if (isPrevDisabled && isNextDisabled) {
//     return "calendar__day--disabled-range-middle";
//   }
//   return "";
// }

// function CalendarDayButton({
//   className,
//   dayObj,
//   weekDays,
//   dayIdx,
//   modifiers,
//   modifiersMap,
//   ...props
// }: {
//   className?: string;
//   dayObj: {
//     date: string; // ISO string!
//     displayMonth: string;
//     outside: boolean;
//     [key: string]: any;
//   };
//   weekDays?: {
//     date: string;
//     displayMonth: string;
//     outside: boolean;
//     [key: string]: any;
//   }[];
//   dayIdx?: number;
//   modifiers: Record<string, any>;
//   modifiersMap?: Record<string, any>;
// } & React.ComponentProps<"button">) {
//   const defaultClassNames = getDefaultClassNames();
//   const ref = React.useRef<HTMLButtonElement>(null);

//   React.useEffect(() => {
//     if (modifiers.focused) ref.current?.focus();
//   }, [modifiers.focused]);

//   let roundingClass = "";
//   const isDisabled = !!modifiers.disabled;

//   if (isDisabled && weekDays && typeof dayIdx === "number" && modifiersMap) {
//     const isNeighborDisabled = (idx: number) => {
//       const weekDay = weekDays[idx];
//       if (!weekDay) return false;
//       const map = modifiersMap[new Date(weekDay.date).toDateString()];
//       return map?.disabled;
//     };
//     const prevDisabled = isNeighborDisabled(dayIdx - 1);
//     const nextDisabled = isNeighborDisabled(dayIdx + 1);

//     if (!prevDisabled && !nextDisabled) {
//       roundingClass = "rounded-md";
//     } else if (!prevDisabled && nextDisabled) {
//       roundingClass = "rounded-l-md";
//     } else if (prevDisabled && !nextDisabled) {
//       roundingClass = "rounded-r-md";
//     } // если оба соседа disabled — скруглений нет
//   }

//   // Преобразуем дату, чтобы показать число дня
//   const dayDate = new Date(dayObj.date);

//   return (
//     <Button
//       ref={ref}
//       variant="ghost"
//       size="sm"
//       disabled={isDisabled}
//       aria-disabled={isDisabled}
//       tabIndex={isDisabled ? -1 : 0}
//       className={cn(
//         "w-8 h-8 p-0 text-center relative aspect-square select-none",
//         defaultClassNames.day,
//         isDisabled && "bg-gray-300 text-muted-foreground opacity-50",
//         roundingClass,
//         className
//       )}
//       {...props}
//     >
//       {dayDate.getDate()}
//     </Button>
//   );
// }

// function Calendar({
//   className,
//   classNames,
//   buttonVariant,
//   captionLayout = "label",
//   ...props
// }: React.ComponentProps<typeof DayPicker>) {
//   const defaultClassNames = getDefaultClassNames();
//   return (
//     <DayPicker
//       locale={ru}
//       showOutsideDays={false}
//       className={cn("bg-background group/calendar p-3", className)}
//       classNames={{
//         root: cn("w-fit", defaultClassNames.root),
//         months: cn(
//           "flex gap-4 flex-col md:flex-row relative",
//           defaultClassNames.months
//         ),
//         month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
//         nav: cn(
//           "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
//           defaultClassNames.nav
//         ),
//         button_previous: cn(
//           "size-(--cell-size) aria-disabled:opacity-0 aria-disabled:cursor-auto p-0 select-none cursor-pointer",
//           defaultClassNames.button_previous
//         ),
//         button_next: cn(
//           buttonVariants({ variant: buttonVariant }),
//           "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
//           defaultClassNames.button_next
//         ),
//         month_caption: cn(
//           "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
//           defaultClassNames.month_caption
//         ),
//         dropdowns: cn(
//           "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
//           defaultClassNames.dropdowns
//         ),
//         dropdown_root: cn(
//           "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
//           defaultClassNames.dropdown_root
//         ),
//         dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
//         caption_label: cn(
//           "select-none font-medium",
//           captionLayout === "label"
//             ? "text-md font-bold capitalize"
//             : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
//           defaultClassNames.caption_label
//         ),
//         table: "w-full border-collapse",
//         weekdays: cn("flex", defaultClassNames.weekdays),
//         weekday: cn(
//           "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none capitalize mb-3",
//           defaultClassNames.weekday
//         ),
//         week: cn("flex w-full mt-2", defaultClassNames.week),
//         week_number_header: cn(
//           "select-none w-(--cell-size)",
//           defaultClassNames.week_number_header
//         ),
//         week_number: cn(
//           "text-[0.8rem] select-none text-muted-foreground",
//           defaultClassNames.week_number
//         ),
//         day: cn(
//           "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
//           defaultClassNames.day
//         ),
//         range_start: cn(
//           "rounded-l-md bg-accent",
//           defaultClassNames.range_start
//         ),
//         range_middle: cn("rounded-none", defaultClassNames.range_middle),
//         range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
//         today: cn(defaultClassNames.today),
//         outside: cn(
//           "text-muted-foreground aria-selected:text-muted-foreground",
//           defaultClassNames.outside
//         ),
//         disabled: cn(
//           "text-muted-foreground opacity-50 bg-gray-300",
//           defaultClassNames.disabled
//         ),
//         hidden: cn("invisible", defaultClassNames.hidden),
//         ...classNames,
//       }}
//       components={{
//         Week: CalendarWeek,
//         DayButton: CalendarDayButton,
//       }}
//       excludeDisabled
//       disabled={{ before: new Date() }}
//       {...props}
//     />
//   );
// }

// export { Calendar, CalendarDayButton };
