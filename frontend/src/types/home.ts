interface HomePageState {
  status: "planned" | "completed" | "active";
  description?: string;
  visit_id?: string;
  next_visit?: {
    days_till: number;
    start: Date;
    end: Date;
  };
  day?: number;
}
