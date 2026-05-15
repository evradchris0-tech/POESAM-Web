// Tweaks app — applique des variations live sur la landing.
// Persiste les valeurs via le mécanisme EDITMODE.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#1B4D8E",
  "accent": "#E87722",
  "density": "regular",
  "fontScale": 100,
  "showTrust": true,
  "showOrange": true
}/*EDITMODE-END*/;

function TFTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Applique les valeurs au :root
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--c-primary', t.primary);
    r.style.setProperty('--c-accent', t.accent);
    document.body.style.fontSize = (16 * t.fontScale / 100) + 'px';

    const trust = document.querySelector('.hero-trust');
    if (trust) trust.style.display = t.showTrust ? '' : 'none';
    const orange = document.querySelector('.orange-band');
    if (orange) orange.style.display = t.showOrange ? '' : 'none';

    // Densité — ajuste padding sections
    const map = { compact: '72px', regular: '112px', comfy: '144px' };
    document.querySelectorAll('section.block').forEach(s => {
      s.style.paddingTop = map[t.density];
      s.style.paddingBottom = map[t.density];
    });
  }, [t]);

  return (
    <TweaksPanel title="TradeFlow · Tweaks">
      <TweakSection label="Couleurs" />
      <TweakColor  label="Navy primaire" value={t.primary}
                   options={['#1B4D8E', '#0E2E55', '#2E6DA4', '#1A1A1A']}
                   onChange={(v) => setTweak('primary', v)} />
      <TweakColor  label="Orange accent" value={t.accent}
                   options={['#E87722', '#C95E0E', '#F5A55B', '#27AE60']}
                   onChange={(v) => setTweak('accent', v)} />

      <TweakSection label="Typographie" />
      <TweakSlider label="Échelle" value={t.fontScale} min={90} max={115} step={1} unit="%"
                   onChange={(v) => setTweak('fontScale', v)} />

      <TweakSection label="Densité" />
      <TweakRadio  label="Espacement" value={t.density}
                   options={['compact', 'regular', 'comfy']}
                   onChange={(v) => setTweak('density', v)} />

      <TweakSection label="Sections" />
      <TweakToggle label="Bandeau confiance hero" value={t.showTrust}
                   onChange={(v) => setTweak('showTrust', v)} />
      <TweakToggle label="Synergie Orange" value={t.showOrange}
                   onChange={(v) => setTweak('showOrange', v)} />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<TFTweaks />);
