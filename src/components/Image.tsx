import "./Image.css";

export default function Image({
  path,
  alt,
  attribution,
  attribAsLink,
}: {
  path: string;
  alt: string;
  attribution?: string;
  attribAsLink?: boolean;
}) {
  return (
    <div className="image">
      <img alt={alt} src={path} />
      <label>{alt}</label>
      {attribution && (
        <label className="attrib">
          <i>Source: </i>
          {attribAsLink ? (
            <a href={"//" + attribution}>{attribution}</a>
          ) : (
            attribution
          )}
        </label>
      )}
    </div>
  );
}
