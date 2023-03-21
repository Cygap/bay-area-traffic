export default function Marker({
  lat,
  lng,
  text
}: {
  lat: number;
  lng: number;
  text: string;
}) {
  return <div>{text}</div>;
}
