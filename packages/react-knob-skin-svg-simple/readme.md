@d10221/React-Knob Skin (css)

Internal (To be Bundled);

Sample Skin

```javascript
/**
 * Roland color
 */
const DEFAULT_COLOR = "#f37d02";
/**
 * classes apends classes
 * styles: overrides styles
 */
export default function SimpleSkin(props: React.SVGProps<SVGSVGElement> & {
  classes?: {
    circle?: string | undefined,
    dial?: string | undefined,
  },
  styles?: {
    circle?: CSSProperties | undefined,
    dial?: CSSProperties | undefined,
  }
})
```
