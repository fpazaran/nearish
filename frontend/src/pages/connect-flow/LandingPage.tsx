import googleIcon from "../../assets/google-icon.png";
import PrivacyPolicy from "../../components/buttons/PrivacyPolicy";
import TermsOfService from "../../components/buttons/TermsOfService";
import { useAuth } from "../../contexts/AuthContext";
import { LuCalendarHeart } from "react-icons/lu";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { FaRandom } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { getMe } from "../../api/backend/auth";
import { useUser } from "../../contexts/UserContext";

// components
import SquareRounded from "../../components/SquareRounded";
import Background from "../../components/Background";
import Loading from "../Loading";



export default function LandingPage() {
  const auth = useAuth();
  const user = useUser();

  const handleSignInWithGoogle = async () => {
    try {
      await auth.handleSignInWithGoogle();
      user.setMe(await getMe());
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Show loading while checking auth state or couple status
  if (auth.loading || user.loading) {
    return (
      <Loading />
    );
  }

  return (
    <Background>
      {/* main content*/}
      <div className="flex-5 flex flex-row w-full h-full justify-center">
        <div className="flex flex-row w-full h-full max-w-7xl px-10">
          {/* left section */}
          <div className="flex-2 h-full flex flex-col items-start justify-end">
            <div className="flex flex-col items-start justify-center gap-4 pb-20 max-w-190">
              <div className="text-5xl text-[var(--darker_pink)] font-medium">
                nearish
              </div>
              <div className="text-6xl text-[var(--darker_pink)] font-medium">
                Your shared space for visits, memories, and little wishes.
              </div>
              <div className="text-2xl text-[var(--medium_pink)] font-medium font-">
                In one space you can plan activities to do together, save
                memories, and surprise each other.
              </div>
            </div>
            <button
              className="bg-[var(--lightest_pink)] px-6 py-2 rounded-full flex flex-row items-center gap-2 shadow-lg/5 min-w-58 transition-opacity duration-300 ease-in-out active:opacity-30"
              onClick={handleSignInWithGoogle}
            >
              <img src={googleIcon} alt="Google Icon" className="w-4 h-4" />
              <div className="text-[var(--darker_pink)] font-medium">
                Continue with Google
              </div>
            </button>
          </div>
          {/* right section */}
          <div className="flex-1 flex flex-col w-1/2 h-full bg-[var(--darker_pink)] rounded-b-[20px] max-w-110">
            <div className="flex-8 flex flex-col gap-10 items-start justify-end pl-5">
              <div className="flex flex-row items-center gap-4">
                <SquareRounded>
                  <LuCalendarHeart className="text-[var(--darker_pink)] w-7 h-7" />
                </SquareRounded>
                <div className="text-[var(--bg_pink)] text-xl font-medium">Plan visits day-by-day.</div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <SquareRounded>
                  <MdOutlinePhotoCameraBack className="text-[var(--darker_pink)] w-8 h-8" />
                </SquareRounded>
                <div className="text-[var(--bg_pink)] text-xl font-medium">Save moments together.</div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <SquareRounded>
                  <FaRandom className="text-[var(--darker_pink)] w-6 h-6" />
                </SquareRounded>
                <div className="text-[var(--bg_pink)] text-xl font-medium">Pick a random adventure.</div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <SquareRounded>
                  <BsStars className="text-[var(--darker_pink)] w-7 h-7" />
                </SquareRounded>
                <div className="text-[var(--bg_pink)] text-xl font-medium">Surprise each other with little wishes.</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row gap-4" />
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="flex-3 flex flex-row w-full h-full max-w-7xl px-10">
        <div className="flex flex-row w-full h-full max-w-7xl justify-end items-end pb-5 gap-4">
          <PrivacyPolicy />
          <TermsOfService />
        </div>
      </div>
    </Background>
  );
}
