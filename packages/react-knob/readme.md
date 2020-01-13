React Knob (WIP)


API:

```javascript
    import Knob from "./"
```

# Knob: 
 
 * Creates a knob with default skin if no children provided
 * Holds internal state
 * Applies rotation via style.transform property
 * Gate for options
 * Controls overlay visibility  

```javascript
/**
 * Main/Entry Component
 */
const Knob: FunctionComponent<{
  /**
   * Holds the value to be translated to rotation amount
   * @required
   * @default 0
   */
  value: number;
  /** @description minimum applicable value @default 0*/
  min?: number;
  /** @description maximum applicable value @default 100*/
  max?: number;
  /** Step size @default 1 */
  step: number;
  /**
   * @description will be applied as 'width' and 'height' equally as style property
   * @optional   
   * @default 65px   
   * */
  size?: number | string | undefined;
  /**
   * @description total rotation in deg, ex: 360°
   */
  bufferSize?: number;
  /**
   * do not render overlay
   */
  noOverlay?: boolean | undefined;
  /**
   * @optional
   * @description callback with the new value   
   */
  onChange?: OnChange | undefined;
  /**
   * @description allows override this component main container props see './KnobContainer'
   * 
   */
  containerProps?: Omit<KnobContainerProps, "size"> | undefined | undefined
}>
```

Skins: 

The only skin requirement is to accept and apply the custom component the style mutation applied by [`<Rotate />`](./src/rotate.ts)

```javascript
/**
 * It needs to forward down the style: transform
 */
export default function SimpleSkin(props: React.SVGProps<SVGSVGElement>) {
  const { style, ...p } = props;
  return <svg {...p}
    viewBox="0 0 100 100"
    focusable={"false"}
    style={{
       // you have to accept the style mutation
       // for this to rotate       
      ...style,
      touchAction: "none"
    }}>
    <circle
      cx="50%"
      cy="50%"
      r={"47%"}
      style={{
        // filter: "url(#drop-shadow)"
      }}
    />
    <rect x="48%" y="4%" width="5%" height="33%" fill="white" />
  </svg>
```