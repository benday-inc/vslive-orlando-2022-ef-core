using Microsoft.AspNetCore.Mvc;

namespace Benday.Demo7.WebUi.Controllers
{
    public abstract class MvcControllerBase<TEditorViewModel> : Controller
    {
        protected virtual void BeforeReturnFromEdit(int? id, TEditorViewModel viewModel)
        {
        }
    }
}
