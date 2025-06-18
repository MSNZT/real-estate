export type BookingCreateResponse = {
  id: string;
  startDate: string;
  endDate: string;
  adId: string;
  renterId: string;
  guestCounts: number;
  guestName: string;
  guestPhone: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingCreateDto = {
  adId: string;
  startDate: Date;
  endDate: Date;
  guestName: string;
  guestPhone: string;
};

export type OccupiedDate = {
  startDate: string;
  endDate: string;
};
