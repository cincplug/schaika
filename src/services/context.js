var context;
if (typeof window !== `undefined`) {
    context = new (window.AudioContext || window.webkitAudioContext)();
}
export default context;
