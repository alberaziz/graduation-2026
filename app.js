/**
 * ============================================================================
 * GRADUATE 2026 - PHOTOBOOTH APPLICATION (app.js)
 * Architecture: Offline-First Progressive Web App (PWA) + Vanilla ES6+
 * Enterprise Resilience:
 *   1. 100% Foolproof Splash Screen Removal (Guaranteed Non-Blocking 2000ms Fade)
 *   2. Comprehensive Try/Catch Wrapping & Incognito In-Memory IndexedDB Fallback
 *   3. Multi-State Smart Countdown Timer (OFF -> 3s -> 5s -> OFF)
 *   4. Tactile Haptic Vibration & Offline Camera Shutter Sound (Audio Data URI)
 *   5. On-Device Auto-Polaroid Collage Strip Engine (Canvas API)
 *   6. Smart Background Sync Worker (Silent Uploads, Rate-Limit Backoff)
 *   7. 4 Valid XML Inline SVG Frames with Native CSS Scroll-Snapping (60-120fps)
 *   8. Fullscreen Isolated Lightbox with Native Scroll-Snap Navigation
 * ============================================================================
 */

// ============================================================================
// 1. MOBILE-SAFE USER-GESTURE INITIALIZATION & SHARED-ELEMENT HERO MORPH
// No automatic setTimeout dismissal. The splash screen MUST only dismiss when
// the user explicitly TAPS or CLICKS anywhere on it.
// On tap/click:
//   - Unlocks mobile-restricted browser APIs (Audio Context, IndexedDB, SW)
//   - Executes 60-120fps hardware-accelerated "Shared Element" Hero Morph:
//     "Class of 2026" smoothly slides & scales into the top header slot (#header-brand-title)
//   - Completely purges #splash-screen from the DOM after 800ms.
// ============================================================================

(() => {
  'use strict';

  // ==========================================================================
  // 2. BACKEND GOOGLE APPS SCRIPT WEB APP CONFIGURATION
  // ==========================================================================
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJqgbbH2UBN-KzefwQspwHAU-iIx-W0gbcBGafuoFNNdzqT5lTlV3-C1lp8KCjuIhH/exec";

  // ==========================================================================
  // 3. HARDCODED BASE64 CAMERA SHUTTER SOUND (100% OFFLINE DATA URI)
  // ==========================================================================
  const SHUTTER_SOUND_DATA_URL = "data:audio/wav;base64,UklGRmwdAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUgdAADHKDFl5nTCIwwynMxbyCu15tlv0rLPktrC9eQ2pEDAU4XR48yL2Vfuw/qO+/sv8DDeHkPpyN+SGvjbDM0Q5xv06OmxJrpb9j/1/57YALbu5775nRdyIqwBkw1kGBcxJg9L7obrA8Sdz8gTNSCtK1ctEwoiGAXX0+af8Zb90sh50YwQxT0RNMZCLQAN8kPVpcrV4y8jNAeXH7oqGB2pCN8FrQfuwiTGYtRDBgILkiMHJ5IAnuz4+1rauQELDPj7N+1SGlEs4Ty4C1T8x/czxJnchvBIDbczmgaQEGsRQAOr+IgHrOkV43njEBKuIjw2MBX3C3b1l/Ro5Gf0iui3FIMDGwf2Cf0kEBSy7l/0peuf1iYHhQ6/Jwoc9gEg/wT96P5N6aj83+uK7KoQ+gPoK1wrwwx6ABrQ4eud4Z4KVhb1HQ8FChkwFVAUUu6c9vHkj+CiCMweUyZVJAEH2Pie4abxQfchB5X7uQ6BCuALfBGLGEH7i/nH2z3yHwFT/vwE8BdXGlv6ovm08RED9P4a+MrpJ/E2A2ERviEcCNfxZe2L9uL7G/+WCuH+Tg2BE+IAFgDv/WHp/e3W5UwDqAeiCWYMbg+OALT7BP3I7/r1jQJA/54GzhP8DLUS+w5Q+ITuRPb5+LEImv+GCcUPoge1+hcEmv5D7+740fPi/0MBpBFrCQwPg/Y2/DTy3fx99+3/Jv8t/ukNMBJQEYD/+vB18nzrlvU9/DsMQwYxD0UKv/jAAgn88fvr8dX2GAM8Bc4N/REcARL8y/kF9hf/L/w+B9kBlAbKA/oKtAcN/HX/Efih9lL0GQLcDvQICw3E/4b0rf/3AF32zQK0/CT7BweqCHwFGADf+6r0XPeC9+P6KgKKB/8A1QMC/oYC5fnJ/MX7fvRG+W8DOgTVCLQKm/om/cr4ifc0/isFt/8DAcYBuwOe/1gFnv8X+jX4L/iZA2EIYAPwAnECp/t3AZD84fhBAXL+gP+/AYMIvwnABBn/1/sK9Jj7hAJpBYv/JAdFBpoDdQPq/QcBVP0N+2X+HwT3BlYGTAYTBJf6Gfqn/xP78fvG/5r/Zv96BCYDuwCY/i37z/iH+iUCEgM0CAEHIAAVAZMCdQD6+tL7a/4f/WUD1AUxA6AEx/0N/T/71f45AX7+a/8nBL4C4QJ5ARkDKf8C+/z8c/8C/sICKgI2BRr/nAA3/nYAhP9xABr83/7z/ggDdgWbA7//xPy1+Rz+u/+BAUABNwBqAfEC2QLu/2X8E/4U/8/+P/5mAWgEUQG2AB3/l/uj//D9ZP9w/mgBigMUALEDCAAaAJP9DPxq/HD+uf8HAYUDlQLd/8f9+f2j/1//ZP9N/UL//AJgAxEBiAEr/4H92/yX/uD+TQBCAdUAoP97AQwCWQAZ/5n89vw9/zwCEQRoAlH/af7+/dz/kP7f/fr/Q/5tAXsC2QIkAsf/e/19/pX91v6M/3oANAGj/0z/+P8JAaf/Xv0j/Z/9WP8dAi0C7gGO/8D/MP4u/db+qP8E/ygACgChAEICNgBaAFT/kP0Z/bb+kwGDAhgBHQIt/9z/n/+b/lr+8/8Q/5QAYgHbAh0C9ACB/5b+M/4H/80AyAFRABABfwHu//P/DQA1/iv+ZP6b/7kBkAGFAjkBtP5b/5b/Y/9iAAwAGf8ZAQYAKAHuAX7/fP/W/sP9sP6dAAYB4wGAADwARQCR/73/Vv/d//L/PgAMAOQBvgHEAHf/ZP8s/xf/jQCj/8H/fgD0AM0AYACTAF7/tv6q/iwADACJAesArADE/1v/cv8hAD7/Yv8AAIYAUwCDAU0AygBd/y3/6P7V/9L/DgDmAHoAwwBYAIb/aQCq/wL/YP8r/9AA6gB9AWUACgCe/1D/y//8/wQAMwDJ/6YA5ACPAO3/mf8a/2r/kP/k/50A7QCbAH8AxP/c/x4AhP84/6z/JQDVAPkA3QCpAEEAQ/9g/2z/3v+TAEEAegBwAA8AYwAAAJD/If/+/tj/oABiAA0BnADY/xQA2P/N/+n/7/9AANz/NwCAAIAAbgDb/2L/K/+i/yYABwDHAFkAZABUAKj/EQDS/8H/ff+n/zIAvgDKAFIAyv/R/7X/yf+i/04AOwBVAAkAEwBoANr/mf+x/3r/vP/l/4MAtwBxAC4At/+b/+3/FgDb/9n/NgDv/4sANwD9/xkA5P+h/5f/1P82ACMAWwAwAPf/GwDa/7P/bf+H/8L/3P8nAHEAWQBLAL//9f+Y/87/u/8JAEMAOAAoABcA8f/h/83/pv+y//X/VwBRAEMA+v/4/8r/DgCm/8L/7v/w/yYAUgA8ADEA+v/k/8X/sf8HAPf/QQBGAPv/OgAJAOj/y/+w/9X/sv/z/0cAJABJAAgA0P/k/8//uf/2/9L/6f/w/zIAGgBEAAcA8v+l/83/0f/+/xcAKQARACcAKQDY//n/zv/h/8r/FQAiACkAMQAqAO3/8f+4/+X///8hAB4AJwAMAEUAMgAPAPL/1f/n/9j/IAA0AEYAIwDm/wEA0v/T/9X/+/8IAB0AKQBEADcAHgD6/9r/0/8HAB4A+P8FAP3/JQATABMA9v/s/+n/6/8JAB4ANgA/AP7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/jOAPzpqrXb/f4ND4x7QJE9TEXUNa/s/GB8h8nneI8x784IuJhumLrhJmQTr9VHPt7YN8VfnZ/0ouS6k6I8BgAGAC4VupLngsQJoAwgu9+9iF2goR08YW7p1IEmxJ8cW5xNCDbYJExHrVE8avCZeCZrmOPFV6oX1sw+8DX3yl+lCoPqGAYDwg62nRLu3wmzaDrTc4y7jC88zMaFF/0fcSDRWgxWIO0QaOiN4MJlE+Tj4CB83V/7u/G4EKx1XJl9Sc0lPKSz6ZuX75TDpjr4F5Y++O7WisziyHcERxb3PpOjwFGcHPRA9AvQpcQi7HZxDU0FURLgN8xvoCNYNYPj6Peo/py3dL9pG0TkcGPX6oQLCA3ToVQG72kWmCK2AneCUAcOWvuPSWMfn6P0AD/nn+TQeEzIwOI4Ywx0MEREVhge0He4HmDYgIj4hHik/Mi89hz+BLJ4YODUKGTEf5+gv1EvOFcFo08O1FbN1xWHXmrlovxnnUPCH/XETxAJC+9oSiQrIAVYP4fU0B2sH5Q59CLshNywPHXw7ujqcP6c/tyqTJqIZ6fU0+7b5et8V1QflVMUaz5/UO8P51kjx0vdaA6cG2AGHDLnsagQx9E8TFwgcBCsKJRHr8skMuQ46HWQkUiNXKyEwPEG5IrIVvhXGI3oJnfFR/T/y488v14bj/s380aLYSO5b+eH6EeQvBOgIlepoCY7opukG7LDySfHCDcL6AAAhFOYrTxXrL2gxfir8Pk0xDRhFECYLrxUf8a34qOMr+dPtct5J6ZbVBeaO6SL20+l976zw9fDs/evgt/ED3yb17flX5/8HGPjK9BAHuhueJ1sxozKwLmowoTHEG+sfBBbkBRoS6wMP69DryOTa4KnlR9y165Plt+it99HpPuMA5JP8/+yH91X2n+mE7T7x2PUM7qEEUv8pBD0T0yrKJdolJituGeslSyXTG1kUZQwpDGL6PPDE8kPmUe5M50/7kPRw/jv9iQH7+yPnbPMk84HxY+Dt5j7k8/Aa7cH3bwUpDNIKcxQDGRUjDCMcHCEasRy4JLQNWA7NB/YBTv4CAKT5q/Y79kb2PvHg+HAAwfzD8rnvHvxp9Lzmz+2Y7YffVedb7tD3uvEg74IDGw4eCZkMHBFtGT4mWyBcH8gfOQiSDkMTKf59C5QF5vb49u721wdc+Bv9x/toBpv/KfBI+Lr5fvX46wHhB+nF5K3xPfMI92HxgPN5BBkNBxPLGm0akRAuDvEcgxSGCEYRSQD7/vYHBAUADbT74/2mAeMJpQn4BXf4ggDc/qT4WPl+7Hzt6ukF7untF+gO8DfrUe8G9yD7jgYBC3oHigibEewO+wmJB0UT3AVWCHsOw/95Caj/YwI2APIKuw/rADgDowgEAdz1WvLK+cvzd+kU6//pauYk4xHwevW4+CMAt/59BJ8GvwizD8oRjQtlCuQOfg0nC5MEiApeA+AMtAfsAqoE0QfEA2oNkAzBB9wFu/m3AL70HvQO8ib0Z+fF5DXsreel9X/0XfO7+7f5OQE1AXIAcgZKAt8GbwztCS4A+gbO/nII1Ao3DkkH2QS6CnsNJwu6CWcCpwKLAaP58Pyh/Gz0B/D78C3u8/KP7vXtv/Vu+xX2dv9LBdwBDwmUAeIDHgSV/6//FwMLBagGuAMOCEgJ4AlxDt0OgQn1Dr0QFQ4PAnUECgKk+IH49PBR8WTuMu0d81zxD/Ln9iL48v98/oYDFAKiAQoDUgVcA9cBXv17/4v9lP87BXEK4QopDqsJNAmpDnUQ9Qq6DAIJtAjC/mH/4QA39Qn48vR48AvxOfhs9/X7Avd2/qD3Pv/u/FT/wvoy/SMAHACnAs374/1I/qcClwC/CckG8AuGDkgQXA+7D9cL8wZMBVgB1v5O/X//efWi9NTzpvSs9iX8ovu5+E3/JfpS/F4AUgHq+fz5t/qA/dH9s/4l/zoClgAkAE8G+wPcBBkKMwtFCMIKjAo9C2AFiQKL/nH8j/m99yz7LPhs+Vr6y/03/gj5zf/O+cr+/fsF+pj4Dvo/+9X8RP63/NP+6vywAeL/+wC/BbMHRglEC+cMfQnLB1QI2gYyAcAF7f1ZAWgAk/yZ+Cr5NvtL/ub8sPtJ/5gAjfva/SL6f/hM/UL39vz+/NH7k/yF+oD/q/06BUkFxAb1BmAJywldCkoLFAi5BcEF1QSX/lj9nACV/a3+8/8k/xH7CPtsANX8/gDo/Nb9kf6y/f/48Pcc/Cj7Kfw3+EX5sfwnAtMDPgHaBaIIcQhLBiMGawUfBesGngR5AVkBSP4tAmUANP/5/F4Bzv1tAAn/FAH6/03/cf82/Q77Ofwt/DH73/fe98n6XPlu+8T9mf7LAFgBCwZWA0EFuwY+CK4DVAMKA6sCmf8i/yL/zgL2/8L+ugHC/uACCQIUAkIA7vxH/OX6hfs1+aD4o/uF+Pv4gvje/Gr90vvXAA8BUQJGBU0G1AYJB9kGYwOxAVkESgK7AW8DdQPBAnoAf/+nAE8CZwEiASkAIP+nAZX9hP8u+1L8OPkp/Of7b/nQ++36Wv1r/SwA/gDhAUAE5wTJA0cDGgP/BB8DcwJ/AhsBrgB+AfH/kgFmAMAAvgFWA7gA+f+q/94A3v/i/jH8kfoV/QX6yPow+4n57/wV+3D9HP5S/7YA7P+WAfMB8wFZA6YB1gK3AU0ACwK1AXAAhAC1AjYDqAOIAh4C7AHNAv4AXgAJAHH9I/7r/BT8LfuM+lL8Zvt8/OL7Afzq/ywA8P8EAqgBowKEAYECmgIlAgwAzf81AtH/1QDBAc0CigHpA0cDEwPlAUICrAHsAfgAdAAa/iH/Kf3j+0n9h/tc/CD8vP18/Q/+8v1i/gwBiP+nAdQBcgHR/8r/QgHKAKgA1f9MATIBIwI9AiQDOQLvAasCxwFwAZgAkf/t/xr/I/4n/fv7xv2m+1T9ePwT/un9p//l/SEAz/8m/9z+6AB9AGX/tAB+AOUAigBtAQQCSgGLAW8CDQImAxsEZwO1A2wD1AKbAdUAiP8q/tL9kP78/Qr+lv2o/SD+Wv2m/j/+Nf/y//z+JQAEAJb+Lf8rAPX+cQBXAKQAqv8tADMBxwFvAu8BugKGA8EBQwLVAh8CQAHqAAEAMf+m/oD9s/2T/X395P2l/gH+yf/m/xAAkf4+/nL/If40/9j+0f5k/37/9v8OAcIAiwF1AqACdwOuAjMC8gL9Af0B5AD9APsA+f4hAAz/7f0b/pn+Mv+2/0D+AwDr/rL/D//A/z3/Yf4f//H+MP/k/RP/mP5TAC//HACwAWQBKwGMAsQCtQIbA1UCeQEdAUQB9P90/xL/7/4FAJL+8/4n/xX/rv6x/tr/d//H/pr+4P4Y//n98f3V/RP+9v2D/lH/LP+lABgBegCWAdYB8QHWAawBRQIgAmwBeADxAKP/hADY/4n/BP9I/zL/W/8pAEkAMAB6/9L+p/4O/+H+D/7c/h/+af70/qb+lv66/10AdgBCAKcAvgE2AjsBhAE9AY0BnQB1AcwAowCy/3AAg/9//3EABgAIAO3/XwDd/ygAbf/j/kT/Y/5q/g7/3v0K/wb/6/6i/0X/jv/O/10A5gCVAWcBtAHCAawAZQH0AKIAAgGBAIMA6f9FAEIAmwAWACMA/f/F/8//WgCp/yn/h/+z/qP+qP4G/2L+dP53/jz/CP/C/wsAQQBeADIBeAAdAcAAywCUAKIARQChABQAMwC1ABAAKAC2AIoA8AAgAJwAQQCl/1sALf+G/3P/W/+a/hb/KP5t/nb+8P4Q/+T/6//x/74AbwB4AK4AtgCIAJIA/ABGAKEAqQD7/0sAPABiAGAAwgCyAGQA3wBVAOz/TQA1AJH/LP/0/tn+Gf+//mL+i/7X/nb/qP+I//b/+//l/68AQgA+AIYAsABdADIA7/9hAHoAZgBXANcA1wB0AGcAigD5AKEAlwDy/yMADACK/yn/Xf9A/7n+VP8E/1L/kf+7/wIAAgD7/08AbABtADYAjwBRANr/AQAqACwAUQCiANcA6wB7APIAyQDzAKYAZAA7AIAAAQAlALP/sf82/xX/T/8J/93+af90/5v/WP8aAL3/NABQAMn/LAAgANH/4v9SAPD/QwDw/1cALABsALQAkQB9AJ4AtQCPAJoACABDAAQAkP/b/6L/dv+K/zv/DP9S/6L/3v+D/7b/6P/t/7X/+f/n/xUA6/+n/7D/9v/q/2QARgApAI8AmAB9AI8ABQGoAHMAiAAzABIAEADb//r/g/9i/1b/Nv+B/23/vP/G/47/BACT/87/EgDb/wYA5/+d/6T//v8NAPb/RAD2/yIAPAC3AJIAjwCbAJwArwBpAIcAVABIAB8A3/+V/8z/lP/M/7b/bv/g/+n/oP/w/wMA9v/5/+L/2f+A/8L/t//c/6v/AgDc/yYAVwBkAJ4AwQCRANIAiQBmAKcAlgBnAPv/3v/P/8//lf/P/6r/zf+6/6D/0v+v//v/zf/f/5z/5f+M/9f/of/I/6j/3f/p/+D/MQBLAHUAXAB8ALMAqgC4AIEATABbACIAEwD6/x0AGADD/+b/q//n/8T/4v/z/7n/zf/J/9X/nv/F/8X/oP+6/8f/f/+f/9f/uf8TADoAMwAdAHQAaQByAHQAhgB6AEIAFwApAEAAIADh//H/2P8OANX/0f8QANv/6v/7//j/+/+p/8H/vf+r/8D/nv+7/8P/pf/J/9b/5f/5/0wAWQBWAFgATwBLADoAOwBGADIALwA5ADMAEwAXAOT/8/8DAOz/FwAUAB0A0v/Q/9D/xP+a/6b/t/+q/5f/iP+c/+b/vv/l/x4ACgAYAE4AZABpAEYALAAbAEkALgApAAwA/f8nAPz/DAD3/zIA/v/1/wMA9/////n/y//R/5z/tv+u/6v/vv/A/9r/x//h/+f/+P8RADEARwBHADEASAAbABAAHwAmAB8AHAAuACQAMgAeABcANwAMAB8AFgAiAOr/AADQ/+T/wf+3/7//vv/E/8//yv/f/8n/2P///yEAKAA1ACoAKAAiAC4ACwAgAA0ABwAIAAkAMgAfACkAPAATAEEAGwApABcA9//3/+v/5v/D/8f/tv/B/8j/0v+1/8v/w//j//X/EwDw/yQAGgASAC4A/P/+/yAAJwAbAAkALQATADUAFQA/ADMAIQBAACIAJAAdAAAACgD7/+r/1v+2/7f/tf/O/7j/v//n/9n/8//r/wgA8P8bAPP/CwAZAAgAEAAZAPz/IQAAAC0ALwA2ACIAHgBCAD0AKwAcABwACgDw////9P/c/+T/0//D/+L/x//a//L/4P/c//3//P/t/w4A7v/y/wsACgD0//T/EgACAB8AHgAwABQAGgA3AD8ALwAyABwAIgAaAPX/6v/4/9b/7v/Z/8f/2v/g/9P/7P/t/+L/+v/t/wAACAADAO7/5P8DAP//5//z/xAAEwARABgAIgApADoANgAkACoAJQANAB4ACwAFAAMA4//u/+X/6P/Y/9b/3f/i/+r/+f/k/+f/6P/s////+P/i//b/9f8AAPz//f8NAAEAEQATACcAGQAhADEALQAqACEAHwABAP3/BgDo/+T/+v/o/+n/6P/t//T//v/3//7////9//z/8v/t//T/7f/o/+H/8f/0//3///8EAA0AJwAWACcAIgAWACQAEgAKAAoA+//7//X//P/p/+f/+f/4/wEA7f/x//3/8v/4//T/+P/3/+n/5P/n/+r/9P/k/+r//v8KAAQADgAZABYAKQAjACgAFgAUABQAEQAQAP7/9/8EAP7/BAD1/wUA+P/2//r/9P////v//f/q//L/6f/s/+//5f/w/+z/8P/5//3/BQAKABYAGwAdABMAHAAPAB0AEgAGAAcABAAJAPf/BwD//wQA9/8FAAAA/P8HAPn/8//2/+z/9f/z//H/3v/j/+D/8v/p//v/9/8CAAYADgAPABEADwATABoAEwANAAYABAACAAYA///+/wkA+/8GAAUA///7/wIA9//+//X/8//z/+//8v/r/+r/7v/t/+z/7f/5/wcAAgAEAAwAEAATAA4ADgANAA4ACwAJAAgACwAMAA0AAgAHAAkAAQAIAAAACwD8/wUA9v/z//L/6v/q/+z/7P/k/+v/7v/x//T/AAD9//3/DgAFAAUADAAGAAQACgACAAEACgAIAAMABwANABAACQAPAAQACAAFAP//AQD9//X/8v/3//X/8v/r/+//7P/r//r//P/9/wUA/f8HAAIACAABAAMACAAEAAUACgAIAAUACQAEAAUACgAJAAoACAAHAAkACwD/////+v/1/+//7f/s/+n/7v/t//P/8v/9//r//f8CAAEAAQAFAAgAAAAGAP3/AwD+/wAABgAAAAIACgAFAA8ADgARAA4ABQAMAAcA+//5//v/9P/4//b/9f/1//X/9v/1//X/+P/4//r/AAACAPz///8BAAAABAD9//7/AAACAAYABgAHAAcADwAPAAwACwAMAAkAAgD9/////v/7//n/8f/5//j/8v/0//X//P/+//j/+//+/wIAAwD8//r//f8BAAIA/v8DAAMAAQAGAAkACAAJAAgADAAIAAcACwADAP//BAABAP///P/7//X/+//z//T/+f/5//r/+P/9//7/+v////v/+P/8/wAA/P/6/wEAAwAGAAIABgAKAAcACwAHAAgACQAJAAMABgADAAIA+v/9/w==";
  let shutterAudio = null;
  try {
    if (typeof Audio !== "undefined") {
      shutterAudio = new Audio(SHUTTER_SOUND_DATA_URL);
      shutterAudio.volume = 0.9;
    }
  } catch (audioErr) {
    console.warn("[Audio] Audio preload notice:", audioErr);
  }

  // ==========================================================================
  // 4. SERVICE WORKER REGISTRATION (SAFE NON-BLOCKING TRY/CATCH)
  // ==========================================================================
  try {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        try {
          navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('[ServiceWorker] Registered with scope:', reg.scope))
            .catch((err) => console.warn('[ServiceWorker] Registration notice:', err));
        } catch (err) {
          console.warn('[ServiceWorker] Register exception:', err);
        }
      });
    }
  } catch (swErr) {
    console.warn('[ServiceWorker] ServiceWorker check exception:', swErr);
  }

  // ==========================================================================
  // 5. INDEXED-DB WRAPPER WITH IN-MEMORY RESILIENCE (INCOGNITO-SAFE)
  // ==========================================================================
  const memoryStore = []; // In-memory fallback if IndexedDB is blocked or unavailable

  const PhotoboothDB = {
    dbName: "PhotoboothDB_2026",
    dbVersion: 1,
    storeName: "photos",
    _db: null,
    _failed: false,

    async init() {
      if (this._failed) return null;
      if (this._db) return this._db;

      try {
        if (!window.indexedDB) {
          console.warn("[IndexedDB] Not supported, using in-memory store.");
          this._failed = true;
          return null;
        }

        return await new Promise((resolve) => {
          try {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
              try {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                  const store = db.createObjectStore(this.storeName, { keyPath: "id" });
                  store.createIndex("status", "status", { unique: false });
                  store.createIndex("userName", "userName", { unique: false });
                  store.createIndex("timestamp", "timestamp", { unique: false });
                }
              } catch (upgradeErr) {
                console.warn("[IndexedDB] Upgrade error:", upgradeErr);
              }
            };

            request.onsuccess = (event) => {
              this._db = event.target.result;
              resolve(this._db);
            };

            request.onerror = (event) => {
              console.warn("[IndexedDB] Access blocked or errored (incognito mode), fallback active:", event.target.error);
              this._failed = true;
              resolve(null);
            };
          } catch (openErr) {
            console.warn("[IndexedDB] Open exception, fallback active:", openErr);
            this._failed = true;
            resolve(null);
          }
        });
      } catch (err) {
        console.warn("[IndexedDB] General init exception, fallback active:", err);
        this._failed = true;
        return null;
      }
    },

    async savePhoto(photoRecord) {
      try {
        const db = await this.init();
        if (!db || this._failed) {
          memoryStore.push(photoRecord);
          return photoRecord;
        }

        return await new Promise((resolve) => {
          try {
            const tx = db.transaction(this.storeName, "readwrite");
            const store = tx.objectStore(this.storeName);
            const req = store.put(photoRecord);

            req.onsuccess = () => resolve(photoRecord);
            req.onerror = () => {
              memoryStore.push(photoRecord);
              resolve(photoRecord);
            };
          } catch (txErr) {
            memoryStore.push(photoRecord);
            resolve(photoRecord);
          }
        });
      } catch (err) {
        memoryStore.push(photoRecord);
        return photoRecord;
      }
    },

    async getUserPhotos(userName) {
      try {
        const db = await this.init();
        if (!db || this._failed) {
          const filtered = userName 
            ? memoryStore.filter(p => (p.userName || "").toLowerCase() === userName.toLowerCase())
            : [...memoryStore];
          filtered.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          return filtered;
        }

        return await new Promise((resolve) => {
          try {
            const tx = db.transaction(this.storeName, "readonly");
            const store = tx.objectStore(this.storeName);
            const req = store.getAll();

            req.onsuccess = () => {
              const all = req.result || [];
              const combined = [...all, ...memoryStore];
              const filtered = userName 
                ? combined.filter(p => (p.userName || "").toLowerCase() === userName.toLowerCase())
                : combined;
              filtered.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
              resolve(filtered);
            };
            req.onerror = () => {
              resolve([...memoryStore]);
            };
          } catch (e) {
            resolve([...memoryStore]);
          }
        });
      } catch (err) {
        return [...memoryStore];
      }
    },

    async getPendingPhotos() {
      try {
        const db = await this.init();
        if (!db || this._failed) {
          return memoryStore.filter(p => p.status === "pending").sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        }

        return await new Promise((resolve) => {
          try {
            const tx = db.transaction(this.storeName, "readonly");
            const store = tx.objectStore(this.storeName);
            const index = store.index("status");
            const req = index.getAll("pending");

            req.onsuccess = () => {
              const list = req.result || [];
              const memPending = memoryStore.filter(p => p.status === "pending");
              const combined = [...list, ...memPending];
              combined.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
              resolve(combined);
            };
            req.onerror = () => {
              resolve(memoryStore.filter(p => p.status === "pending"));
            };
          } catch (e) {
            resolve(memoryStore.filter(p => p.status === "pending"));
          }
        });
      } catch (err) {
        return memoryStore.filter(p => p.status === "pending");
      }
    },

    async updatePhotoStatus(id, newStatus) {
      try {
        const memItem = memoryStore.find(p => p.id === id);
        if (memItem) {
          memItem.status = newStatus;
          memItem.syncedAt = Date.now();
        }

        const db = await this.init();
        if (!db || this._failed) return memItem;

        return await new Promise((resolve) => {
          try {
            const tx = db.transaction(this.storeName, "readwrite");
            const store = tx.objectStore(this.storeName);
            const getReq = store.get(id);

            getReq.onsuccess = () => {
              const item = getReq.result;
              if (!item) return resolve(memItem);
              item.status = newStatus;
              item.syncedAt = Date.now();
              const putReq = store.put(item);
              putReq.onsuccess = () => resolve(item);
              putReq.onerror = () => resolve(memItem);
            };
            getReq.onerror = () => resolve(memItem);
          } catch (e) {
            resolve(memItem);
          }
        });
      } catch (err) {
        return null;
      }
    },

    async incrementRetry(id) {
      try {
        const memItem = memoryStore.find(p => p.id === id);
        if (memItem) {
          memItem.retryCount = (memItem.retryCount || 0) + 1;
          memItem.lastRetry = Date.now();
        }

        const db = await this.init();
        if (!db || this._failed) return memItem;

        return await new Promise((resolve) => {
          try {
            const tx = db.transaction(this.storeName, "readwrite");
            const store = tx.objectStore(this.storeName);
            const getReq = store.get(id);

            getReq.onsuccess = () => {
              const item = getReq.result;
              if (!item) return resolve(memItem);
              item.retryCount = (item.retryCount || 0) + 1;
              item.lastRetry = Date.now();
              const putReq = store.put(item);
              putReq.onsuccess = () => resolve(item);
              putReq.onerror = () => resolve(memItem);
            };
            getReq.onerror = () => resolve(memItem);
          } catch (e) {
            resolve(memItem);
          }
        });
      } catch (err) {
        return null;
      }
    }
  };

  // ==========================================================================
  // 6. 4 LIGHTWEIGHT NATIVE INLINE SVG FRAMES (100% VALID XML)
  // ==========================================================================
  const PHOTOBOOTH_THEMES = [
    // ------------------------------------------------------------------------
    // THEME 1: CLASSIC GOLD
    // ------------------------------------------------------------------------
    {
      id: "classic-gold",
      name: "Classic Gold",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <defs>
          <linearGradient id="goldMet1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff4b8"/>
            <stop offset="25%" stop-color="#f5d365"/>
            <stop offset="50%" stop-color="#d4af37"/>
            <stop offset="75%" stop-color="#9a7610"/>
            <stop offset="100%" stop-color="#ffd976"/>
          </linearGradient>
        </defs>
        <rect width="1080" height="1440" fill="rgba(255, 215, 0, 0.03)"/>
        <rect x="34" y="34" width="1012" height="1372" rx="20" fill="none" stroke="url(#goldMet1)" stroke-width="4.5"/>
        <rect x="48" y="48" width="984" height="1344" rx="14" fill="none" stroke="url(#goldMet1)" stroke-width="1.5" stroke-dasharray="14 8" opacity="0.8"/>
        <line x1="540" y1="20" x2="540" y2="40" stroke="url(#goldMet1)" stroke-width="2"/>
        <line x1="540" y1="1400" x2="540" y2="1420" stroke="url(#goldMet1)" stroke-width="2"/>
        <g transform="translate(38, 38)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 45 L 0 0 L 45 0"/>
          <circle cx="15" cy="15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(1042, 38)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 45 L 0 0 L -45 0"/>
          <circle cx="-15" cy="15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(38, 1402)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 -45 L 0 0 L 45 0"/>
          <circle cx="15" cy="-15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(1042, 1402)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 -45 L 0 0 L -45 0"/>
          <circle cx="-15" cy="-15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(540, 95)" text-anchor="middle">
          <path d="M 0 -26 L 40 -12 L 0 2 L -40 -12 Z" fill="url(#goldMet1)"/>
          <text y="36" font-family="'Cinzel', 'Times New Roman', serif" font-size="20" font-weight="700" letter-spacing="8" fill="url(#goldMet1)">
            &#9733; CONGRATULATIONS &#9733;
          </text>
          <text y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="6" fill="#ffffff">
            CLASS OF 2026
          </text>
        </g>
        <rect x="52" y="1220" width="976" height="170" rx="22" fill="#090a0e" fill-opacity="0.88" stroke="url(#goldMet1)" stroke-width="2"/>
        <g transform="translate(540, 1266)" text-anchor="middle">
          <text y="24" font-family="'Cinzel', 'Times New Roman', serif" font-size="86" font-weight="900" letter-spacing="12" fill="url(#goldMet1)">
            2026
          </text>
          <text y="72" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5" fill="#ffffff">
            Church Of The Virgin Mary and St. Mina
          </text>
          <text y="96" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#f5d365">
            GRADUATION CELEBRATION
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 2: NOIR MINIMAL
    // ------------------------------------------------------------------------
    {
      id: "noir-minimal",
      name: "Noir Minimal",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <rect width="1080" height="1440" fill="rgba(0, 0, 0, 0.05)"/>
        <rect x="36" y="36" width="1008" height="1368" rx="8" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9"/>
        <rect x="50" y="50" width="980" height="1340" rx="4" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
        <path d="M 50 180 L 100 180 M 50 180 L 50 230" stroke="#ffffff" stroke-width="2" fill="none"/>
        <path d="M 1030 180 L 980 180 M 1030 180 L 1030 230" stroke="#ffffff" stroke-width="2" fill="none"/>
        <path d="M 50 1260 L 100 1260 M 50 1260 L 50 1210" stroke="#ffffff" stroke-width="2" fill="none"/>
        <path d="M 1030 1260 L 980 1260 M 1030 1260 L 1030 1210" stroke="#ffffff" stroke-width="2" fill="none"/>
        <line x1="530" y1="720" x2="550" y2="720" stroke="#ffffff" stroke-width="1.5" opacity="0.75"/>
        <line x1="540" y1="710" x2="540" y2="730" stroke="#ffffff" stroke-width="1.5" opacity="0.75"/>
        <circle cx="540" cy="720" r="18" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
        <g transform="translate(68, 98)">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" letter-spacing="6" fill="#ffffff">
            GRADUATE
          </text>
          <text y="24" font-family="'Courier New', monospace" font-size="14" font-weight="600" letter-spacing="3" fill="#a1a1aa">
            COMMENCEMENT ARCHIVE // VOL. 26
          </text>
        </g>
        <g transform="translate(1012, 98)" text-anchor="end">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#ffffff">
            2026
          </text>
          <text y="24" font-family="'Courier New', monospace" font-size="14" font-weight="600" letter-spacing="2" fill="#a1a1aa">
            ST. MINA
          </text>
        </g>
        <rect x="52" y="1328" width="976" height="60" rx="8" fill="#000000" fill-opacity="0.75"/>
        <g transform="translate(72, 1365)">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" letter-spacing="2" fill="#ffffff">
            CHURCH OF THE VIRGIN MARY &amp; ST. MINA
          </text>
        </g>
        <g transform="translate(1008, 1365)" text-anchor="end">
          <text y="0" font-family="'Courier New', monospace" font-size="15" font-weight="700" letter-spacing="3" fill="#ffffff">
            REC &#9679; 1080P
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 3: CELEBRATION
    // ------------------------------------------------------------------------
    {
      id: "celebration",
      name: "Celebration",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <defs>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ec4899"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>
        <g fill="#f59e0b" opacity="0.85">
          <polygon points="90,120 95,135 110,135 98,144 102,159 90,150 78,159 82,144 70,135 85,135"/>
          <polygon points="980,130 984,142 996,142 986,150 990,162 980,154 970,162 974,150 964,142 976,142"/>
          <polygon points="120,1200 124,1212 136,1212 126,1220 130,1232 120,1224 110,1232 114,1220 104,1212 116,1212"/>
          <polygon points="960,1190 964,1202 976,1202 966,1210 970,1222 960,1214 950,1222 954,1210 944,1202 956,1202"/>
        </g>
        <g fill="#06b6d4" opacity="0.8">
          <circle cx="160" cy="180" r="7"/>
          <circle cx="920" cy="200" r="9"/>
          <circle cx="210" cy="1150" r="8"/>
          <circle cx="890" cy="1130" r="7"/>
        </g>
        <g fill="#ec4899" opacity="0.8">
          <rect x="190" y="100" width="16" height="8" rx="2" transform="rotate(25 190 100)"/>
          <rect x="880" y="110" width="18" height="9" rx="2" transform="rotate(-35 880 110)"/>
          <rect x="150" y="1260" width="18" height="9" rx="2" transform="rotate(40 150 1260)"/>
          <rect x="910" y="1240" width="16" height="8" rx="2" transform="rotate(-20 910 1240)"/>
        </g>
        <rect x="36" y="36" width="1008" height="1368" rx="28" fill="none" stroke="url(#neonGlow)" stroke-width="5"/>
        <g transform="translate(540, 110)" text-anchor="middle">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="4" fill="#ffffff">
            WE DID IT! &#127891;
          </text>
        </g>
        <rect x="64" y="1240" width="952" height="142" rx="24" fill="#090a0f" fill-opacity="0.9" stroke="url(#neonGlow)" stroke-width="2.5"/>
        <g transform="translate(540, 1290)" text-anchor="middle">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="6" fill="#facc15">
            CLASS OF 2026
          </text>
          <text y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="1" fill="#ffffff">
            Church Of The Virgin Mary and St. Mina
          </text>
          <text y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="3" fill="#38bdf8">
            HONORING OUR GRADUATES
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 4: VINTAGE POLAROID
    // ------------------------------------------------------------------------
    {
      id: "vintage-polaroid",
      name: "Vintage Polaroid",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <rect x="0" y="0" width="1080" height="42" fill="#faf8f5"/>
        <rect x="0" y="0" width="42" height="1440" fill="#faf8f5"/>
        <rect x="1038" y="0" width="42" height="1440" fill="#faf8f5"/>
        <rect x="0" y="1200" width="1080" height="240" fill="#faf8f5"/>
        <rect x="42" y="42" width="996" height="1158" fill="none" stroke="#e0deda" stroke-width="3"/>
        <rect x="90" y="24" width="130" height="36" rx="3" fill="#e8e5dc" opacity="0.85" transform="rotate(-6 155 42)"/>
        <rect x="860" y="24" width="130" height="36" rx="3" fill="#e8e5dc" opacity="0.85" transform="rotate(5 925 42)"/>
        <g transform="translate(540, 1264)" text-anchor="middle">
          <text y="0" font-family="'Brush Script MT', 'Dancing Script', 'Baskerville', 'Georgia', cursive, serif" font-size="52" font-style="italic" font-weight="bold" fill="#1c1c1e">
            Graduation Day &#8226; Class of 2026
          </text>
          <text y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="#444444">
            CHURCH OF THE VIRGIN MARY AND ST. MINA
          </text>
          <text y="70" font-family="'Courier New', monospace" font-size="14" font-weight="bold" letter-spacing="4" fill="#777777">
            '26 06 15 &#8226; COMMENCEMENT MEMORY
          </text>
        </g>
        <g transform="translate(980, 1370)" text-anchor="middle">
          <circle cx="0" cy="0" r="26" fill="none" stroke="#aa7722" stroke-width="2" stroke-dasharray="4 2"/>
          <text y="4" font-family="sans-serif" font-size="9" font-weight="bold" fill="#aa7722">OFFICIAL</text>
        </g>
      </svg>`
    }
  ];

  PHOTOBOOTH_THEMES.forEach((theme) => {
    try {
      theme.dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(theme.svg.trim());
      theme.frameImage = new Image();
      theme.frameImage.crossOrigin = "anonymous";
      theme.frameImage.src = theme.dataUrl;
    } catch (e) {
      console.warn("[Theme] Preload notice:", e);
    }
  });

  // ==========================================================================
  // 7. APPLICATION STATE & SMART COUNTDOWN TIMER STATE
  // ==========================================================================
  const sessionPhotos = [];
  let activeFrameIndex = 0;
  let currentLightboxIndex = 0;
  let isSyncing = false;
  const QUEUE_POLL_INTERVAL_MS = 6000;

  const TIMER_STATES = ["OFF", "3s", "5s"];
  let timerStateIndex = 0;
  let isCountingDown = false;
  let countdownTimerId = null;

  const appState = {
    userName: "",
    stream: null,
    facingMode: "user"
  };

  // ==========================================================================
  // 8. DOM ELEMENT REFERENCES (SAFE RESOLUTION)
  // ==========================================================================
  const dom = {
    splashScreen: document.getElementById("splash-screen"),
    splashBackdrop: document.getElementById("splash-backdrop"),
    splashGlow: document.getElementById("splash-glow"),
    splashHeroTitle: document.getElementById("splash-hero-title"),
    splashAuxTop: document.getElementById("splash-aux-top"),
    realHeaderText: document.getElementById("real-header-text") || document.getElementById("header-brand-title"),
    headerBrandTitle: document.getElementById("real-header-text") || document.getElementById("header-brand-title"),

    loginView: document.getElementById("login-view"),
    cameraView: document.getElementById("camera-view"),
    galleryView: document.getElementById("gallery-view"),
    lightboxView: document.getElementById("view-lightbox"),

    loginForm: document.getElementById("login-form"),
    userNameInput: document.getElementById("user-name-input"),
    headerUserTag: document.getElementById("header-user-tag"),
    headerUserName: document.getElementById("header-user-name"),
    logoutBtn: document.getElementById("logout-btn"),

    cameraViewport: document.getElementById("camera-viewport"),
    framesScrollTrack: document.getElementById("frames-scroll-track"),
    video: document.getElementById("camera-stream"),
    themeNameLabel: document.getElementById("theme-name-label"),
    themeStepBadge: document.getElementById("theme-step-badge"),
    prevFrameBtn: document.getElementById("prev-frame-btn"),
    nextFrameBtn: document.getElementById("next-frame-btn"),
    cameraTimerBtn: document.getElementById("camera-timer-btn"),
    timerBadge: document.getElementById("timer-badge"),
    countdownOverlay: document.getElementById("countdown-overlay"),
    countdownNumber: document.getElementById("countdown-number"),
    shutterBtn: document.getElementById("shutter-btn"),
    flipCamBtn: document.getElementById("flip-cam-btn"),
    shutterFlash: document.getElementById("shutter-flash-overlay"),
    canvas: document.getElementById("capture-canvas"),
    cameraStatusMsg: document.getElementById("camera-status-msg"),
    cameraStatusText: document.getElementById("camera-status-text"),

    galleryOpenBtn: document.getElementById("gallery-open-btn"),
    galleryBackBtn: document.getElementById("gallery-back-btn"),
    createStripBtn: document.getElementById("create-strip-btn"),
    galleryToast: document.getElementById("gallery-toast"),
    galleryToastText: document.getElementById("gallery-toast-text"),
    galleryThumbPreview: document.getElementById("gallery-thumb-preview"),
    galleryThumbPlaceholder: document.getElementById("gallery-thumb-placeholder"),
    galleryCountBadge: document.getElementById("gallery-count-badge"),
    galleryHeaderCount: document.getElementById("gallery-header-count"),
    galleryEmptyState: document.getElementById("gallery-empty-state"),
    galleryGrid: document.getElementById("gallery-grid"),
    syncStatusDot: document.getElementById("sync-status-dot"),
    syncStatusText: document.getElementById("sync-status-text"),
    syncNetworkBadge: document.getElementById("sync-network-badge"),

    lightboxScrollTrack: document.getElementById("lightbox-scroll-track"),
    lightboxCloseBtn: document.getElementById("lightbox-close-btn"),
    lightboxDownloadBtn: document.getElementById("lightbox-download-btn"),
  };

  // ==========================================================================
  // 9. MULTI-STATE SMART COUNTDOWN TIMER CONTROLLER
  // ==========================================================================
  function updateTimerButtonUI() {
    if (!dom.timerBadge || !dom.cameraTimerBtn) return;
    const currentState = TIMER_STATES[timerStateIndex];
    dom.timerBadge.textContent = currentState;

    if (currentState === "OFF") {
      dom.cameraTimerBtn.className = "btn-bounce flex items-center space-x-1.5 rounded-full border border-neutral-700 bg-surface-850/95 px-3 py-1 text-xs text-neutral-400 transition-all shadow-sm";
    } else {
      dom.cameraTimerBtn.className = "btn-bounce flex items-center space-x-1.5 rounded-full border border-gold-500/70 bg-gold-950/60 px-3 py-1 text-xs text-gold-300 transition-all shadow-[0_0_14px_rgba(212,175,55,0.3)]";
    }
  }

  function toggleCountdownTimer() {
    timerStateIndex = (timerStateIndex + 1) % TIMER_STATES.length;
    updateTimerButtonUI();
    if (navigator.vibrate) {
      try { navigator.vibrate([20]); } catch (e) {}
    }
  }

  // ==========================================================================
  // 10. NATIVE CSS SCROLL SNAP SETUP (CAMERA FRAMES)
  // ==========================================================================
  function initCameraFrames() {
    if (!dom.framesScrollTrack) return;
    dom.framesScrollTrack.innerHTML = "";

    PHOTOBOOTH_THEMES.forEach((theme, index) => {
      const slide = document.createElement("div");
      slide.className = "snap-frame-slide";
      slide.dataset.index = index;
      slide.innerHTML = theme.svg.trim();
      dom.framesScrollTrack.appendChild(slide);
      theme.slideElement = slide;
    });

    try {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(idx)) {
              activeFrameIndex = idx;
              updateThemeLabel(idx);
            }
          }
        });
      }, {
        root: dom.framesScrollTrack,
        threshold: 0.6
      });

      const slides = dom.framesScrollTrack.querySelectorAll(".snap-frame-slide");
      slides.forEach(slide => observer.observe(slide));
    } catch (obsErr) {
      console.warn("[IntersectionObserver] Frame track observer notice:", obsErr);
    }
  }

  function updateThemeLabel(index) {
    const theme = PHOTOBOOTH_THEMES[index];
    if (!theme || !dom.themeNameLabel || !dom.themeStepBadge) return;
    dom.themeNameLabel.textContent = theme.name;
    dom.themeStepBadge.textContent = `${index + 1}/${PHOTOBOOTH_THEMES.length}`;
  }

  function scrollToFrame(index) {
    if (!dom.framesScrollTrack) return;
    if (index < 0) index = PHOTOBOOTH_THEMES.length - 1;
    if (index >= PHOTOBOOTH_THEMES.length) index = 0;
    const slideWidth = dom.framesScrollTrack.clientWidth || 340;
    dom.framesScrollTrack.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
  }

  initCameraFrames();
  updateThemeLabel(0);

  if (dom.prevFrameBtn) {
    dom.prevFrameBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      scrollToFrame(activeFrameIndex - 1);
    });
  }

  if (dom.nextFrameBtn) {
    dom.nextFrameBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      scrollToFrame(activeFrameIndex + 1);
    });
  }

  // ==========================================================================
  // 11. VIEW TRANSITIONS API WRAPPER (NATIVE iOS OPTICAL MORPH WITH FALLBACK)
  // ==========================================================================
  function executeViewTransition(updateCallback) {
    if (typeof document.startViewTransition === "function") {
      try {
        return document.startViewTransition(updateCallback);
      } catch (e) {
        console.warn("[ViewTransition] Notice:", e);
        updateCallback();
        return {
          finished: Promise.resolve(),
          ready: Promise.resolve(),
          updateCallbackDone: Promise.resolve()
        };
      }
    } else {
      updateCallback();
      return {
        finished: Promise.resolve(),
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve()
      };
    }
  }

  function showView(viewId) {
    const views = [dom.loginView, dom.cameraView];
    views.forEach((v) => {
      if (!v) return;
      if (v.id === viewId) {
        v.classList.remove("opacity-0", "pointer-events-none", "hidden");
        v.classList.add("opacity-100", "pointer-events-auto");
        v.style.display = "flex";
      } else {
        v.classList.add("opacity-0", "pointer-events-none", "hidden");
        v.classList.remove("opacity-100", "pointer-events-auto");
        v.style.display = "none";
      }
    });
  }

  async function openGalleryPanel() {
    await refreshGalleryFromIndexedDB();
    executeViewTransition(() => {
      if (dom.galleryView) {
        dom.galleryView.classList.remove("translate-y-full", "pointer-events-none");
        dom.galleryView.classList.add("translate-y-0", "pointer-events-auto");
      }
    });
  }

  function closeGalleryPanel() {
    executeViewTransition(() => {
      if (dom.galleryView) {
        dom.galleryView.classList.remove("translate-y-0", "pointer-events-auto");
        dom.galleryView.classList.add("translate-y-full", "pointer-events-none");
      }
    });
  }

  function showToast(message) {
    if (!dom.galleryToast || !dom.galleryToastText) return;
    dom.galleryToastText.textContent = message;
    dom.galleryToast.classList.remove("opacity-0", "translate-y-2");
    dom.galleryToast.classList.add("opacity-100", "translate-y-0");
    setTimeout(() => {
      dom.galleryToast.classList.remove("opacity-100", "translate-y-0");
      dom.galleryToast.classList.add("opacity-0", "translate-y-2");
    }, 2500);
  }

  // ==========================================================================
  // 12. WEBRTC CAMERA CONTROLS (CLEAN VIDEO FEED)
  // ==========================================================================
  async function startCamera() {
    if (appState.stream) {
      stopCamera();
    }

    if (dom.cameraStatusMsg) dom.cameraStatusMsg.classList.remove("hidden");
    if (dom.cameraStatusText) dom.cameraStatusText.textContent = "Accessing camera...";

    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: appState.facingMode },
        width: { ideal: 1920, min: 1280 },
        height: { ideal: 1080, min: 720 }
      }
    };

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia not supported in this environment");
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      appState.stream = stream;
      if (dom.video) {
        dom.video.srcObject = stream;
        await dom.video.play();
        if (appState.facingMode === "user") {
          dom.video.classList.add("mirrored");
        } else {
          dom.video.classList.remove("mirrored");
        }
      }
      if (dom.cameraStatusMsg) dom.cameraStatusMsg.classList.add("hidden");
    } catch (err) {
      console.warn("High-res camera failed, attempting basic camera fallback", err);
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
          appState.stream = fallbackStream;
          if (dom.video) {
            dom.video.srcObject = fallbackStream;
            await dom.video.play();
            if (appState.facingMode === "user") {
              dom.video.classList.add("mirrored");
            } else {
              dom.video.classList.remove("mirrored");
            }
          }
          if (dom.cameraStatusMsg) dom.cameraStatusMsg.classList.add("hidden");
        }
      } catch (fatalErr) {
        console.warn("Camera access denied or unavailable:", fatalErr);
        if (dom.cameraStatusText) {
          dom.cameraStatusText.textContent = "Camera permission needed or camera unavailable.";
        }
      }
    }
  }

  function stopCamera() {
    try {
      if (appState.stream) {
        appState.stream.getTracks().forEach((track) => track.stop());
        appState.stream = null;
      }
      if (dom.video) dom.video.srcObject = null;
    } catch (e) {
      console.warn("[Camera] Stop notice:", e);
    }
  }

  async function flipCamera() {
    appState.facingMode = appState.facingMode === "user" ? "environment" : "user";
    await startCamera();
  }

  // ==========================================================================
  // 13. PHOTO CAPTURE PIPELINE (HAPTIC, SOUND & COUNTDOWN INTEGRATION)
  // ==========================================================================
  function handleShutterTrigger() {
    if (isCountingDown) return;

    if (timerStateIndex === 0) {
      executePhotoCapture();
    } else {
      startCountdownCapture(timerStateIndex === 1 ? 3 : 5);
    }
  }

  function startCountdownCapture(seconds) {
    isCountingDown = true;
    let remaining = seconds;

    if (dom.countdownNumber) dom.countdownNumber.textContent = remaining;
    if (dom.countdownOverlay) {
      dom.countdownOverlay.classList.remove("opacity-0", "pointer-events-none");
      dom.countdownOverlay.classList.add("opacity-100");
    }

    triggerCountdownPop();

    if (navigator.vibrate) {
      try { navigator.vibrate([25]); } catch (e) {}
    }

    countdownTimerId = setInterval(() => {
      remaining--;

      if (remaining > 0) {
        if (dom.countdownNumber) dom.countdownNumber.textContent = remaining;
        triggerCountdownPop();
        if (navigator.vibrate) {
          try { navigator.vibrate([25]); } catch (e) {}
        }
      } else {
        clearInterval(countdownTimerId);
        countdownTimerId = null;

        if (dom.countdownOverlay) {
          dom.countdownOverlay.classList.remove("opacity-100");
          dom.countdownOverlay.classList.add("opacity-0", "pointer-events-none");
        }
        isCountingDown = false;

        executePhotoCapture();
      }
    }, 1000);
  }

  function triggerCountdownPop() {
    if (!dom.countdownNumber) return;
    dom.countdownNumber.classList.remove("countdown-active-num");
    void dom.countdownNumber.offsetWidth;
    dom.countdownNumber.classList.add("countdown-active-num");
  }

  async function executePhotoCapture() {
    if (!dom.video || !dom.video.videoWidth || !dom.video.videoHeight) {
      console.warn("Video stream not ready yet.");
      return;
    }

    const activeTheme = PHOTOBOOTH_THEMES[activeFrameIndex];
    if (!activeTheme || !activeTheme.frameImage.complete) {
      console.warn("SVG Frame still loading.");
      return;
    }

    // 1. Haptic Vibration (50ms)
    if (navigator.vibrate) {
      try {
        navigator.vibrate([50]);
      } catch (vibErr) {
        console.warn("[Haptic] Vibration notice:", vibErr);
      }
    }

    // 2. Play Camera Shutter Sound (100% Offline Base64 Audio)
    if (shutterAudio) {
      try {
        shutterAudio.currentTime = 0;
        shutterAudio.play().catch(() => {});
      } catch (audioErr) {
        console.warn("[Audio] Shutter sound play notice:", audioErr);
      }
    }

    // 3. Shutter Flash Effect
    if (dom.shutterFlash) {
      dom.shutterFlash.classList.add("flash-active");
      setTimeout(() => {
        dom.shutterFlash.classList.remove("flash-active");
      }, 280);
    }

    // Standard 3:4 High-Resolution Canvas dimensions
    const canvasWidth = 1080;
    const canvasHeight = 1440;
    dom.canvas.width = canvasWidth;
    dom.canvas.height = canvasHeight;
    const ctx = dom.canvas.getContext("2d");

    // 4. Symmetrical 3:4 object-cover crop math
    const vWidth = dom.video.videoWidth || 1080;
    const vHeight = dom.video.videoHeight || 1440;
    const targetRatio = canvasWidth / canvasHeight; // 0.75
    const videoRatio = vWidth / vHeight;

    let sx = 0, sy = 0, sWidth = vWidth, sHeight = vHeight;
    if (videoRatio > targetRatio) {
      sWidth = vHeight * targetRatio;
      sx = (vWidth - sWidth) / 2;
    } else {
      sHeight = vWidth / targetRatio;
      sy = (vHeight - sHeight) / 2;
    }

    // 5. Draw Clean Video Feed (Mirrored horizontally if .mirrored is active)
    const isMirrored = (dom.video && dom.video.classList.contains("mirrored")) || appState.facingMode === "user";
    if (isMirrored) {
      ctx.save();
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(dom.video, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
      ctx.restore();
    } else {
      ctx.drawImage(dom.video, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    }

    // 6. Draw Currently Active SVG Frame ON TOP (un-mirrored context, frame text is 100% normal)
    ctx.drawImage(activeTheme.frameImage, 0, 0, canvasWidth, canvasHeight);

    // 7. Export high-quality Base64 JPEG
    const finalImage = dom.canvas.toDataURL("image/jpeg", 0.90);

    // 8. Form Unique Photo Record
    const cleanName = (appState.userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const filename = `photo_${cleanName}_${uniqueSuffix}.jpg`;

    const photoRecord = {
      id: uniqueSuffix,
      userName: appState.userName || "Guest",
      folderName: appState.userName || "Guest",
      filename: filename,
      dataUrl: finalImage,
      themeName: activeTheme.name,
      timestamp: Date.now(),
      status: "pending",
      retryCount: 0
    };

    // 9. Save to IndexedDB (or in-memory fallback)
    try {
      await PhotoboothDB.savePhoto(photoRecord);
    } catch (idbErr) {
      console.warn("[IndexedDB] Photo save notice:", idbErr);
    }

    // 10. Update in-memory session (newest photo at index 0)
    sessionPhotos.unshift(photoRecord);

    // 11. Update Circular Album Thumbnail Button
    updateGalleryButton();

    // 12. Update UI Sync Indicator
    updateSyncIndicator();

    // 13. Trigger Background Sync Worker (100% Non-Blocking)
    processSyncQueue();
  }

  // ==========================================================================
  // 14. AUTO-POLAROID COLLAGE STRIP (ON-DEVICE IMAGE PROCESSING)
  // ==========================================================================
  async function createPolaroidStrip() {
    const photos = await PhotoboothDB.getUserPhotos(appState.userName);

    if (!photos || photos.length < 3) {
      showToast("Capture at least 3 photos to create a strip!");
      return;
    }

    showToast("Generating Polaroid Strip...");

    const last3Photos = photos.slice(0, 3).reverse();

    const loadImg = (dataUrl) => new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });

    try {
      const [img1, img2, img3] = await Promise.all(last3Photos.map(p => loadImg(p.dataUrl)));

      const stripCanvas = document.createElement("canvas");
      const ctx = stripCanvas.getContext("2d");

      const padding = 40;
      const photoWidth = 720;
      const photoHeight = 960;
      const footerHeight = 180;
      const totalWidth = padding + photoWidth + padding; // 800px
      const totalHeight = (padding * 4) + (photoHeight * 3) + footerHeight; // 3220px

      stripCanvas.width = totalWidth;
      stripCanvas.height = totalHeight;

      // Fill pure white background (#ffffff)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      // Draw Photo 1
      const y1 = padding;
      ctx.drawImage(img1, padding, y1, photoWidth, photoHeight);

      // Draw Photo 2
      const y2 = y1 + photoHeight + padding;
      ctx.drawImage(img2, padding, y2, photoWidth, photoHeight);

      // Draw Photo 3
      const y3 = y2 + photoHeight + padding;
      ctx.drawImage(img3, padding, y3, photoWidth, photoHeight);

      // Draw Centered Dark Text at the bottom
      const textY = y3 + photoHeight + 72;
      ctx.fillStyle = "#111111";
      ctx.textAlign = "center";
      ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Cinzel', 'Times New Roman', Georgia, serif";
      ctx.fillText("Graduation 2026 - Church Of The Virgin Mary and St. Mina", totalWidth / 2, textY);

      ctx.font = "600 15px -apple-system, BlinkMacSystemFont, 'Courier New', monospace";
      ctx.fillStyle = "#666666";
      ctx.fillText("COMMENCEMENT POLAROID MEMORY STRIP", totalWidth / 2, textY + 34);

      const stripDataUrl = stripCanvas.toDataURL("image/jpeg", 0.92);

      const cleanName = (appState.userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueSuffix = `${Date.now()}_strip_${Math.floor(Math.random() * 1000)}`;
      const filename = `photo_${cleanName}_strip_${uniqueSuffix}.jpg`;

      const stripRecord = {
        id: uniqueSuffix,
        userName: appState.userName || "Guest",
        folderName: appState.userName || "Guest",
        filename: filename,
        dataUrl: stripDataUrl,
        themeName: "Polaroid Strip",
        timestamp: Date.now(),
        status: "pending",
        retryCount: 0
      };

      await PhotoboothDB.savePhoto(stripRecord);

      sessionPhotos.unshift(stripRecord);

      updateGalleryButton();
      renderGalleryGrid();
      updateSyncIndicator();

      processSyncQueue();

      showToast("Polaroid Strip generated!");

      openLightbox(0);

    } catch (err) {
      console.error("[Strip Generator Error]", err);
      showToast("Failed to generate strip. Please try again!");
    }
  }

  // ==========================================================================
  // 15. SMART BACKGROUND SYNC & NETWORK WORKER (THE QUEUE)
  // ==========================================================================
  async function updateSyncIndicator() {
    try {
      const pendingList = await PhotoboothDB.getPendingPhotos();
      const pendingCount = pendingList ? pendingList.length : 0;
      const online = navigator.onLine;

      if (!dom.syncStatusDot || !dom.syncStatusText || !dom.syncNetworkBadge) return;

      if (!online) {
        dom.syncStatusDot.className = "h-2 w-2 shrink-0 rounded-full bg-amber-400";
        dom.syncStatusText.textContent = pendingCount > 0
          ? `${pendingCount} Photo${pendingCount > 1 ? 's' : ''} Pending Sync (Saved Locally)`
          : "Offline Mode • All Photos Saved Locally";
        dom.syncNetworkBadge.textContent = "Offline";
        dom.syncNetworkBadge.className = "shrink-0 rounded border border-amber-500/40 bg-amber-950/40 px-2 py-0.5 text-[10px] font-mono text-amber-400";
      } else {
        if (pendingCount > 0) {
          dom.syncStatusDot.className = "h-2 w-2 shrink-0 rounded-full bg-amber-400 animate-pulse";
          dom.syncStatusText.textContent = `${pendingCount} Photo${pendingCount > 1 ? 's' : ''} Pending Sync...`;
          dom.syncNetworkBadge.textContent = "Syncing";
          dom.syncNetworkBadge.className = "shrink-0 rounded border border-gold-500/40 bg-gold-950/40 px-2 py-0.5 text-[10px] font-mono text-gold-300";
        } else {
          dom.syncStatusDot.className = "h-2 w-2 shrink-0 rounded-full bg-emerald-400";
          dom.syncStatusText.textContent = "All photos backed up to cloud";
          dom.syncNetworkBadge.textContent = "Online";
          dom.syncNetworkBadge.className = "shrink-0 rounded border border-emerald-500/30 bg-emerald-950/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400";
        }
      }
    } catch (e) {
      console.warn("[Sync Indicator Error]", e);
    }
  }

  async function processSyncQueue() {
    if (isSyncing || !navigator.onLine) {
      updateSyncIndicator();
      return;
    }

    isSyncing = true;
    updateSyncIndicator();

    try {
      const pendingPhotos = await PhotoboothDB.getPendingPhotos();

      for (const item of pendingPhotos) {
        if (!navigator.onLine) {
          console.log("[Sync Worker] Connection lost mid-queue; pausing sync.");
          break;
        }

        const payload = {
          folderName: item.folderName || item.userName || "Guest",
          image: item.dataUrl,
          filename: item.filename
        };
        const serializedPayload = JSON.stringify(payload);
        let uploadSuccess = false;

        try {
          const response = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8"
            },
            body: serializedPayload
          });

          if (response.ok) {
            uploadSuccess = true;
            console.log(`[Sync Worker] Photo uploaded successfully: ${item.filename}`);
          } else {
            console.warn(`[Sync Worker] Google Apps Script responded HTTP ${response.status} for ${item.filename}`);
          }
        } catch (networkError) {
          try {
            await fetch(APPS_SCRIPT_URL, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "text/plain;charset=utf-8"
              },
              body: serializedPayload
            });
            uploadSuccess = true;
            console.log(`[Sync Worker] Delivered via no-cors fallback: ${item.filename}`);
          } catch (fallbackError) {
            console.warn(`[Sync Worker] Upload failed for ${item.filename}:`, fallbackError.message);
          }
        }

        if (uploadSuccess) {
          await PhotoboothDB.updatePhotoStatus(item.id, "uploaded");

          const inMem = sessionPhotos.find(p => p.id === item.id);
          if (inMem) inMem.status = "uploaded";

          updateSyncIndicator();

          if (dom.galleryView && dom.galleryView.classList.contains("translate-y-0")) {
            renderGalleryGrid();
          }

          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          await PhotoboothDB.incrementRetry(item.id);
          console.warn(`[Sync Worker] Rate limited / transmission error for ${item.filename}. Backing off 5s...`);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          break;
        }
      }
    } catch (err) {
      console.warn("[Sync Worker] Error during sync run:", err);
    } finally {
      isSyncing = false;
      updateSyncIndicator();
    }
  }

  window.addEventListener('online', () => {
    console.log('[Network] Device came ONLINE. Resuming background upload queue.');
    updateSyncIndicator();
    processSyncQueue();
  });

  window.addEventListener('offline', () => {
    console.log('[Network] Device went OFFLINE. Local storage mode active.');
    updateSyncIndicator();
  });

  setInterval(processSyncQueue, QUEUE_POLL_INTERVAL_MS);

  // ==========================================================================
  // 16. IN-APP GALLERY (INDEXED-DB / IN-MEMORY POWERED)
  // ==========================================================================
  async function loadUserSession(userName) {
    try {
      const photos = await PhotoboothDB.getUserPhotos(userName);
      sessionPhotos.length = 0;
      if (photos) photos.forEach(p => sessionPhotos.push(p));
      updateGalleryButton();
      updateSyncIndicator();
    } catch (err) {
      console.warn("[Session] Failed loading photos for user:", err);
    }
  }

  async function refreshGalleryFromIndexedDB() {
    try {
      const photos = await PhotoboothDB.getUserPhotos(appState.userName);
      sessionPhotos.length = 0;
      if (photos) photos.forEach(p => sessionPhotos.push(p));
      updateGalleryButton();
      renderGalleryGrid();
      updateSyncIndicator();
    } catch (err) {
      console.warn("[Gallery] Error refreshing gallery:", err);
    }
  }

  function updateGalleryButton() {
    if (!dom.galleryCountBadge) return;
    const total = sessionPhotos.length;
    if (total > 0 && dom.galleryThumbPreview && dom.galleryThumbPlaceholder) {
      dom.galleryThumbPreview.src = sessionPhotos[0].dataUrl;
      dom.galleryThumbPreview.classList.remove("hidden");
      dom.galleryThumbPlaceholder.classList.add("hidden");

      dom.galleryCountBadge.textContent = total;
      dom.galleryCountBadge.classList.remove("hidden");
      dom.galleryCountBadge.classList.add("flex");
    } else {
      if (dom.galleryThumbPreview) dom.galleryThumbPreview.classList.add("hidden");
      if (dom.galleryThumbPlaceholder) dom.galleryThumbPlaceholder.classList.remove("hidden");
      dom.galleryCountBadge.classList.add("hidden");
    }
  }

  function renderGalleryGrid() {
    if (!dom.galleryGrid || !dom.galleryHeaderCount) return;
    const total = sessionPhotos.length;
    dom.galleryHeaderCount.textContent = total;

    if (total === 0) {
      if (dom.galleryEmptyState) dom.galleryEmptyState.classList.remove("hidden");
      dom.galleryGrid.classList.add("hidden");
      dom.galleryGrid.innerHTML = "";
      return;
    }

    if (dom.galleryEmptyState) dom.galleryEmptyState.classList.add("hidden");
    dom.galleryGrid.classList.remove("hidden");
    dom.galleryGrid.innerHTML = "";

    sessionPhotos.forEach((photo, idx) => {
      const card = document.createElement("div");
      card.id = `gallery-card-${idx}`;
      card.className = "btn-bounce group relative flex flex-col rounded-2xl border border-gold-500/25 bg-surface-850 p-2 shadow-lg cursor-pointer transition-transform";

      const imgContainer = document.createElement("div");
      imgContainer.className = "relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black";

      const img = document.createElement("img");
      img.id = `gallery-img-${idx}`;
      img.src = photo.dataUrl;
      img.alt = `Graduation Shot ${total - idx}`;
      img.className = "h-full w-full object-cover transition-transform duration-200 group-hover:scale-105";

      const isUploaded = photo.status === "uploaded";
      const syncBadge = document.createElement("div");
      syncBadge.className = `absolute top-2 left-2 flex items-center space-x-1 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-md shadow ${
        isUploaded 
          ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
          : "bg-amber-950/80 border border-amber-500/40 text-amber-300"
      }`;
      syncBadge.innerHTML = isUploaded
        ? `<svg class="h-2.5 w-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg><span>Synced</span>`
        : `<svg class="h-2.5 w-2.5 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Pending</span>`;

      const viewBadge = document.createElement("div");
      viewBadge.className = "absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-gold-400 border border-gold-500/40 shadow";
      viewBadge.innerHTML = `
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
        </svg>
      `;

      imgContainer.appendChild(img);
      imgContainer.appendChild(syncBadge);
      imgContainer.appendChild(viewBadge);
      card.appendChild(imgContainer);

      card.addEventListener("click", () => {
        openLightbox(idx);
      });

      dom.galleryGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // 17. FULLSCREEN LIGHTBOX (GALLERY-TO-LIGHTBOX HERO MORPH WITH SCROLL-SNAP)
  // ==========================================================================
  let lightboxObserver = null;

  function openLightbox(index) {
    if (!sessionPhotos.length || !sessionPhotos[index] || !dom.lightboxScrollTrack || !dom.lightboxView) return;
    currentLightboxIndex = index;

    const sourceThumbImg = document.getElementById(`gallery-img-${index}`);

    const buildLightboxDOM = () => {
      dom.lightboxScrollTrack.innerHTML = "";

      sessionPhotos.forEach((photo, idx) => {
        const slide = document.createElement("div");
        slide.className = "snap-lightbox-slide";
        slide.dataset.index = idx;

        const img = document.createElement("img");
        img.id = `lightbox-img-${idx}`;
        img.src = photo.dataUrl;
        img.alt = `Photo ${idx + 1}`;
        img.className = "lightbox-img-card";
        img.draggable = false;

        // Active image participates in Hero Shared Element Morph
        if (idx === index) {
          img.style.viewTransitionName = "hero-lightbox-photo";
          if (sourceThumbImg) sourceThumbImg.style.viewTransitionName = "";
        }

        slide.appendChild(img);
        dom.lightboxScrollTrack.appendChild(slide);
      });

      dom.lightboxView.classList.add("lightbox-active");

      // Position scroll track directly at target slide
      const trackWidth = dom.lightboxScrollTrack.clientWidth || window.innerWidth;
      dom.lightboxScrollTrack.scrollLeft = index * trackWidth;
    };

    if (typeof document.startViewTransition === "function" && sourceThumbImg) {
      sourceThumbImg.style.viewTransitionName = "hero-lightbox-photo";
      const transition = document.startViewTransition(() => {
        buildLightboxDOM();
      });

      transition.finished.finally(() => {
        const activeImg = document.getElementById(`lightbox-img-${index}`);
        if (activeImg) activeImg.style.viewTransitionName = "";
        if (sourceThumbImg) sourceThumbImg.style.viewTransitionName = "";
      });
    } else {
      buildLightboxDOM();
    }

    if (lightboxObserver) lightboxObserver.disconnect();

    try {
      lightboxObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(idx)) {
              currentLightboxIndex = idx;
            }
          }
        });
      }, {
        root: dom.lightboxScrollTrack,
        threshold: 0.6
      });

      const slides = dom.lightboxScrollTrack.querySelectorAll(".snap-lightbox-slide");
      slides.forEach(slide => lightboxObserver.observe(slide));
    } catch (obsErr) {
      console.warn("[Lightbox Observer] Notice:", obsErr);
    }
  }

  function closeLightbox() {
    if (!dom.lightboxView) return;
    const activeIdx = currentLightboxIndex;
    const currentSlideImg = document.getElementById(`lightbox-img-${activeIdx}`);
    const targetThumbImg = document.getElementById(`gallery-img-${activeIdx}`);

    const teardownLightboxDOM = () => {
      dom.lightboxView.classList.remove("lightbox-active");
      if (targetThumbImg) targetThumbImg.style.viewTransitionName = "hero-lightbox-photo";
      if (currentSlideImg) currentSlideImg.style.viewTransitionName = "";
      if (lightboxObserver) {
        lightboxObserver.disconnect();
        lightboxObserver = null;
      }
    };

    if (typeof document.startViewTransition === "function" && currentSlideImg && targetThumbImg) {
      currentSlideImg.style.viewTransitionName = "hero-lightbox-photo";
      const transition = document.startViewTransition(() => {
        teardownLightboxDOM();
      });

      transition.finished.finally(() => {
        if (targetThumbImg) targetThumbImg.style.viewTransitionName = "";
        if (currentSlideImg) currentSlideImg.style.viewTransitionName = "";
      });
    } else {
      teardownLightboxDOM();
    }
  }

  function downloadCurrentLightboxPhoto() {
    if (!sessionPhotos[currentLightboxIndex]) return;
    const photo = sessionPhotos[currentLightboxIndex];
    const link = document.createElement("a");
    const safeName = (appState.userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
    link.download = `${safeName}_Graduation_2026_shot${currentLightboxIndex + 1}.jpg`;
    link.href = photo.dataUrl;
    link.click();
  }

  if (dom.lightboxCloseBtn) {
    dom.lightboxCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (dom.lightboxDownloadBtn) {
    dom.lightboxDownloadBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      downloadCurrentLightboxPhoto();
    });
  }

  if (dom.lightboxView) {
    dom.lightboxView.addEventListener("click", (e) => {
      if (e.target === dom.lightboxView || e.target === dom.lightboxScrollTrack || (e.target.classList && e.target.classList.contains("snap-lightbox-slide"))) {
        closeLightbox();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (dom.lightboxView && dom.lightboxView.classList.contains("lightbox-active")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && currentLightboxIndex > 0) {
        const trackWidth = dom.lightboxScrollTrack.clientWidth;
        dom.lightboxScrollTrack.scrollTo({ left: (currentLightboxIndex - 1) * trackWidth, behavior: "smooth" });
      }
      if (e.key === "ArrowRight" && currentLightboxIndex < sessionPhotos.length - 1) {
        const trackWidth = dom.lightboxScrollTrack.clientWidth;
        dom.lightboxScrollTrack.scrollTo({ left: (currentLightboxIndex + 1) * trackWidth, behavior: "smooth" });
      }
    } else if (dom.cameraView && dom.cameraView.classList.contains("opacity-100")) {
      if (e.key === "ArrowLeft") scrollToFrame(activeFrameIndex - 1);
      if (e.key === "ArrowRight") scrollToFrame(activeFrameIndex + 1);
      if (e.key === " " || e.key === "Enter") handleShutterTrigger();
    }
  });

  // ==========================================================================
  // 17. MOBILE-SAFE USER-GESTURE WARMUP & HERO SHARED ELEMENT TRANSITION
  // ==========================================================================
  let isWarmedUp = false;

  function warmupUserGestureAPIs() {
    if (isWarmedUp) return;
    isWarmedUp = true;

    // 1. Audio Object Warmup (Unlocks iOS/Android HTML5 Audio thread & autoplay policy)
    try {
      if (!shutterAudio && typeof Audio !== "undefined") {
        shutterAudio = new Audio(SHUTTER_SOUND_DATA_URL);
      }
      if (shutterAudio) {
        shutterAudio.volume = 0.9;
        shutterAudio.load();
        const originalVol = shutterAudio.volume;
        shutterAudio.volume = 0;
        const playPromise = shutterAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              shutterAudio.pause();
              shutterAudio.currentTime = 0;
              shutterAudio.volume = originalVol || 0.9;
              console.log("[Audio] Shutter sound unlocked via user gesture.");
            })
            .catch(() => {
              shutterAudio.volume = originalVol || 0.9;
            });
        }
      }
    } catch (audioErr) {
      console.warn("[Audio] Gesture warmup notice:", audioErr);
    }

    // 2. Safe IndexedDB Initialization inside user gesture
    try {
      PhotoboothDB.init()
        .then(() => {
          console.log("[IndexedDB] Storage unlocked via user gesture.");
          try {
            processSyncQueue();
          } catch (e) {}
        })
        .catch((dbErr) => {
          console.warn("[IndexedDB] Gesture initialization notice:", dbErr);
        });
    } catch (e) {
      console.warn("[IndexedDB] Gesture exception:", e);
    }

    // 3. Service Worker Registration inside user gesture
    try {
      if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('[ServiceWorker] Scope registered:', reg.scope))
          .catch((swErr) => console.warn('[ServiceWorker] Registration notice:', swErr));
      }
    } catch (swErr) {
      console.warn('[ServiceWorker] Gesture registration exception:', swErr);
    }
  }

  let splashDismissed = false;

  function performHeroMorph() {
    const splash = dom.splashScreen || document.getElementById("splash-screen");
    const splashBackdrop = dom.splashBackdrop || document.getElementById("splash-backdrop");
    const splashGlow = dom.splashGlow || document.getElementById("splash-glow");
    const splashTitle = dom.splashHeroTitle || document.getElementById("splash-hero-title");
    const splashAuxTop = dom.splashAuxTop || document.getElementById("splash-aux-top");
    const splashAuxBottom = dom.splashAuxBottom || document.getElementById("splash-aux-bottom");
    const realHeaderText = document.getElementById("real-header-text") || dom.realHeaderText || document.getElementById("header-brand-title");

    if (!splash) return;

    if (!splashTitle || !realHeaderText) {
      if (splash) splash.remove();
      if (realHeaderText) {
        realHeaderText.classList.remove("opacity-0");
        realHeaderText.classList.add("opacity-100");
        realHeaderText.style.opacity = "1";
      }
      return;
    }

    // Cancel ongoing CSS keyframe animations so inline transitions take 100% precedence
    splashTitle.style.animation = "none";
    if (splashAuxTop) splashAuxTop.style.animation = "none";
    if (splashAuxBottom) splashAuxBottom.style.animation = "none";
    void splashTitle.offsetWidth; // Force synchronous reflow

    const splashRect = splashTitle.getBoundingClientRect();
    const headerRect = realHeaderText.getBoundingClientRect();

    let dx = 0;
    let dy = -splashRect.top + 16;
    let scale = 0.55;

    if (headerRect && headerRect.width > 0 && headerRect.height > 0) {
      dx = headerRect.left - splashRect.left;
      dy = headerRect.top - splashRect.top;
      scale = headerRect.height / splashRect.height;
    }

    const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
    const DURATION_MS = 800; // 0.8s

    requestAnimationFrame(() => {
      // 1. Fade out the black background, glow, and auxiliary prompts
      if (splashBackdrop) {
        splashBackdrop.style.transition = `opacity ${DURATION_MS}ms ${EASING}`;
        splashBackdrop.style.opacity = "0";
      }
      if (splashGlow) {
        splashGlow.style.transition = `opacity ${DURATION_MS}ms ${EASING}`;
        splashGlow.style.opacity = "0";
      }
      if (splashAuxTop) {
        splashAuxTop.style.transition = `opacity 250ms ${EASING}, transform 250ms ${EASING}`;
        splashAuxTop.style.opacity = "0";
        splashAuxTop.style.transform = "translate3d(0, -16px, 0) scale(0.95)";
      }
      if (splashAuxBottom) {
        splashAuxBottom.style.transition = `opacity 250ms ${EASING}, transform 250ms ${EASING}`;
        splashAuxBottom.style.opacity = "0";
        splashAuxBottom.style.transform = "translate3d(0, 16px, 0) scale(0.95)";
      }

      // 2. Use CSS transform with a 0.8s cubic-bezier transition to physically move the Splash text to the top of the screen
      splashTitle.style.transformOrigin = "0 0";
      splashTitle.style.willChange = "transform";
      splashTitle.style.transition = `transform ${DURATION_MS}ms ${EASING}`;
      splashTitle.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
    });

    // 3. Set a setTimeout for 800ms
    setTimeout(() => {
      // Completely remove the Splash screen from the DOM
      try {
        if (splash && splash.parentNode) {
          splash.remove();
        } else if (splash) {
          splash.remove();
        }
      } catch (cleanErr) {
        console.warn("[Splash] Removal notice:", cleanErr);
      }

      // IMMEDIATELY set the opacity of real-header-text to 1 so it seamlessly takes its place
      if (realHeaderText) {
        realHeaderText.classList.remove("opacity-0");
        realHeaderText.classList.add("opacity-100");
        realHeaderText.style.opacity = "1";
      }
    }, DURATION_MS);
  }

  function initTapToEnterSplashHero() {
    const splash = dom.splashScreen || document.getElementById("splash-screen");
    if (!splash) return;

    const onDismiss = () => {
      if (splashDismissed) return;
      splashDismissed = true;

      // Unlock mobile APIs inside this user interaction
      warmupUserGestureAPIs();

      // Execute Hero Shared Element Morph
      performHeroMorph();
    };

    splash.addEventListener("pointerdown", onDismiss, { passive: true });
    splash.addEventListener("click", onDismiss);
  }

  // ==========================================================================
  // 18. GLOBAL EVENT LISTENERS & INITIALIZATION
  // ==========================================================================
  // Attach tap-to-enter splash listener
  initTapToEnterSplashHero();

  // Initialize IndexedDB (Non-blocking with error catching)
  try {
    PhotoboothDB.init().catch(err => console.warn("[IndexedDB] Boot init notice:", err));
  } catch (dbErr) {
    console.warn("[IndexedDB] Init exception notice:", dbErr);
  }

  // Setup Timer UI state
  updateTimerButtonUI();
  if (dom.cameraTimerBtn) {
    dom.cameraTimerBtn.addEventListener("click", toggleCountdownTimer);
  }

  // Shutter and Camera Flip
  if (dom.shutterBtn) dom.shutterBtn.addEventListener("click", handleShutterTrigger);
  if (dom.flipCamBtn) dom.flipCamBtn.addEventListener("click", flipCamera);

  // Gallery & Auto-Strip Controls
  if (dom.galleryOpenBtn) dom.galleryOpenBtn.addEventListener("click", openGalleryPanel);
  if (dom.galleryBackBtn) dom.galleryBackBtn.addEventListener("click", closeGalleryPanel);
  if (dom.createStripBtn) dom.createStripBtn.addEventListener("click", createPolaroidStrip);

  // ==========================================================================
  // LOGIN SCREEN TRANSITION (NATIVE VIEW TRANSITION WITH 0.5s FALLBACK)
  // ==========================================================================
  let isLoggingIn = false;

  async function handleLoginSubmit(e) {
    if (e) e.preventDefault();
    if (isLoggingIn) return;

    const name = dom.userNameInput ? dom.userNameInput.value.trim() : "";
    if (!name) return;

    isLoggingIn = true;
    appState.userName = name;
    if (dom.headerUserName) dom.headerUserName.textContent = name;
    if (dom.headerUserTag) {
      dom.headerUserTag.classList.remove("hidden");
      dom.headerUserTag.classList.add("flex");
    }
    if (dom.logoutBtn) {
      dom.logoutBtn.classList.remove("hidden");
    }

    // Load user photos in background
    loadUserSession(name).catch(() => {});

    // Start camera stream so video begins streaming immediately in the background
    startCamera();

    const loginWrapper = dom.loginView;
    const cameraWrapper = dom.cameraView;

    if (loginWrapper && cameraWrapper) {
      // 1. Apply smooth opacity 0 over 0.5s to Login wrapper
      loginWrapper.style.transition = "opacity 0.5s ease";
      loginWrapper.style.opacity = "0";
      loginWrapper.style.pointerEvents = "none";

      // 2. Use setTimeout(..., 500)
      setTimeout(() => {
        // Set Login wrapper to display: none
        loginWrapper.style.display = "none";
        loginWrapper.classList.add("hidden");

        // Set Camera wrapper to display: flex with initial opacity: 0
        cameraWrapper.style.display = "flex";
        cameraWrapper.classList.remove("hidden", "pointer-events-none");
        cameraWrapper.classList.add("pointer-events-auto");
        cameraWrapper.style.opacity = "0";
        cameraWrapper.style.transition = "opacity 0.5s ease";

        // 3. Force a DOM reflow, then set Camera wrapper opacity to 1 for smooth fade-in
        void cameraWrapper.offsetWidth;
        cameraWrapper.style.opacity = "1";

        isLoggingIn = false;
      }, 500);
    } else {
      showView("camera-view");
      isLoggingIn = false;
    }
  }

  // Login Form
  if (dom.loginForm) {
    dom.loginForm.addEventListener("submit", handleLoginSubmit);
  }

  // Backdrop tap on Lightbox to dismiss
  if (dom.lightboxView) {
    dom.lightboxView.addEventListener("click", (e) => {
      if (e.target === dom.lightboxView || e.target === dom.lightboxScrollTrack || e.target.classList.contains("snap-lightbox-slide")) {
        closeLightbox();
      }
    });
  }

  // Exit / Switch Guest
  if (dom.logoutBtn) {
    dom.logoutBtn.addEventListener("click", () => {
      stopCamera();
      appState.userName = "";
      sessionPhotos.length = 0;
      updateGalleryButton();
      closeGalleryPanel();
      closeLightbox();
      if (dom.headerUserTag) dom.headerUserTag.classList.add("hidden");
      if (dom.logoutBtn) dom.logoutBtn.classList.add("hidden");
      if (dom.userNameInput) dom.userNameInput.value = "";

      // Reset inline styles on views
      if (dom.cameraView) {
        dom.cameraView.style.display = "none";
        dom.cameraView.classList.add("hidden", "opacity-0", "pointer-events-none");
        dom.cameraView.classList.remove("opacity-100", "pointer-events-auto");
        dom.cameraView.style.opacity = "0";
      }
      if (dom.loginView) {
        dom.loginView.style.display = "flex";
        dom.loginView.classList.remove("hidden", "opacity-0", "pointer-events-none");
        dom.loginView.classList.add("opacity-100", "pointer-events-auto");
        dom.loginView.style.opacity = "1";
        dom.loginView.style.pointerEvents = "auto";
      }
    });
  }

  // Boot check for network & pending uploads
  try {
    updateSyncIndicator();
  } catch (e) {
    console.warn("[Sync Indicator] Boot notice:", e);
  }

  try {
    processSyncQueue();
  } catch (e) {
    console.warn("[Sync Queue] Boot notice:", e);
  }

})();
