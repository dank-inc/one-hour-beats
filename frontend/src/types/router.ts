export type RoutedProps<T = {}> = {
  history: History
  match: { params: { id: string } & T }
  location: Location
}
