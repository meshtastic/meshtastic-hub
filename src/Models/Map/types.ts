type View = {
  coords: [number, number],
  zoom: number
}

type State = {

}

type Meta = {
  accessToken: string
}

type DOM = {
  containerId: string;
  style: string;
}


type MapOptions = {
  DOM: DOM,
  meta?: Meta,
  view: View,
  state?: State,
}
