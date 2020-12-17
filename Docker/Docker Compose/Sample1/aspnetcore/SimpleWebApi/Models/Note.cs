using System.ComponentModel.DataAnnotations.Schema;

namespace SimpleWebApi.Models
{
    public class Note
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
