import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Red de seguridad: si cualquier parte de la app lanza un error al renderizar,
 * en lugar de dejar la pantalla EN BLANCO mostramos un mensaje amable con la
 * opción de recargar. Evita la "pantalla blanca de la muerte", habitual en
 * móviles cuando algo falla al procesar una foto.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('La app encontró un error de renderizado:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fff8f3] text-[#1f1b14] flex items-center justify-center p-6">
          <div className="max-w-sm text-center bg-white border border-[#e2d9ce] rounded-xs shadow-2xl p-7">
            <div className="text-4xl mb-3">💔</div>
            <h1 className="font-serif text-xl font-bold text-[#7d562d] mb-2">
              Algo se rompió por un momento
            </h1>
            <p className="text-xs text-[#82756a] mb-5">
              No te preocupes, tus recuerdos siguen guardados. Recarga para volver
              al álbum.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white font-medium text-xs rounded-full shadow-xs active:scale-98 transition-all cursor-pointer"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
